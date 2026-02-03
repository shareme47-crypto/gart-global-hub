const Membership = require("../models/Membership");
const MembershipApplication = require("../models/MembershipApplication");
const MembershipType = require("../models/MembershipType");
const Payment = require("../models/Payment");
const {
  sendMembershipSubmissionEmail,
  sendAdminMembershipNotification,
} = require("../utils/mailer");
const User = require("../models/User");

const MEMBERSHIP_TYPE_MAP = {
  student: "STUDENT",
  therapist: "THERAPIST",
  allied: "ALLIED",
  volunteer: "VOLUNTEER",
};

const DEFAULT_TYPE_CONFIG = {
  STUDENT: {
    name: "Student Member",
    tier: 1,
    durationMonths: 12,
    fee: { amount: 0, currency: "INR" },
    feeConfig: {
      studentPerYearFees: {
        india: { amount: 200, currency: "INR" },
        lmic: { amount: 4, currency: "USD" },
        international: { amount: 10, currency: "USD" },
      },
    },
  },
  THERAPIST: {
    name: "Radiation Therapist Member",
    tier: 2,
    durationMonths: 60,
    fee: { amount: 0, currency: "INR" },
    feeConfig: {
      regionFees: {
        india: { amount: 1000, currency: "INR" },
        lmic: { amount: 20, currency: "USD" },
        international: { amount: 50, currency: "USD" },
      },
    },
  },
  ALLIED: {
    name: "Radiation Allied Health Professional Member",
    tier: 3,
    durationMonths: 60,
    fee: { amount: 0, currency: "INR" },
    feeConfig: {
      regionFees: {
        india: { amount: 1000, currency: "INR" },
        lmic: { amount: 20, currency: "USD" },
        international: { amount: 50, currency: "USD" },
      },
    },
  },
  VOLUNTEER: {
    name: "Volunteer Member",
    tier: 4,
    durationMonths: 60,
    fee: { amount: 0, currency: "INR" },
    feeConfig: {
      regionFees: {
        india: { amount: 500, currency: "INR" },
        lmic: { amount: 20, currency: "USD" },
        international: { amount: 40, currency: "USD" },
      },
    },
  },
};

function isNonEmptyString(value) {
  return typeof value === "string" && value.trim().length > 0;
}

function parseDate(value) {
  if (!value) return null;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
}

function addMonths(date, months) {
  const next = new Date(date);
  next.setMonth(next.getMonth() + months);
  return next;
}

function requireFields(data, fields, errors) {
  fields.forEach((field) => {
    if (!isNonEmptyString(data[field])) {
      errors.push(`${field} is required`);
    }
  });
}

function validateStudent(data) {
  const errors = [];
  requireFields(
    data,
    [
      "fullName",
      "dateOfBirth",
      "gender",
      "mobile",
      "email",
      "city",
      "state",
      "country",
      "instituteName",
      "courseName",
      "courseDuration",
      "currentYear",
      "university",
    ],
    errors
  );

  const dob = parseDate(data.dateOfBirth);
  if (!dob) errors.push("dateOfBirth must be a valid date");

  const duration = Number.parseInt(data.courseDuration, 10);
  const currentYear = Number.parseInt(data.currentYear, 10);
  if (!Number.isFinite(duration) || duration < 2 || duration > 4) {
    errors.push("courseDuration must be between 2 and 4");
  }
  if (!Number.isFinite(currentYear) || currentYear < 1 || currentYear > 4) {
    errors.push("currentYear must be between 1 and 4");
  }
  if (Number.isFinite(duration) && Number.isFinite(currentYear) && currentYear > duration) {
    errors.push("currentYear cannot exceed courseDuration");
  }
  if (data.declaration !== true) errors.push("declaration must be accepted");

  return { errors, duration, currentYear };
}

function validateProfessional(data) {
  const errors = [];
  requireFields(
    data,
    [
      "applicationType",
      "fullName",
      "dateOfBirth",
      "gender",
      "mobile",
      "email",
      "city",
      "state",
      "country",
      "profession",
      "organization",
      "department",
      "experience",
      "authorityName",
      "registrationNumber",
      "registrationValidity",
    ],
    errors
  );

  if (!["fresh", "renewal"].includes(data.applicationType)) {
    errors.push("applicationType must be fresh or renewal");
  }

  const dob = parseDate(data.dateOfBirth);
  if (!dob) errors.push("dateOfBirth must be a valid date");

  const validity = parseDate(data.registrationValidity);
  if (!validity) errors.push("registrationValidity must be a valid date");

  const exp = Number.parseInt(data.experience, 10);
  if (!Number.isFinite(exp) || exp < 0) errors.push("experience must be 0 or greater");

  if (data.eligibility1 !== true || data.eligibility2 !== true || data.eligibility3 !== true) {
    errors.push("eligibility criteria must be accepted");
  }

  if (data.applicationType === "renewal") {
    requireFields(data, ["gartMembershipNumber", "previousExpiryDate"], errors);
    const prevExpiry = parseDate(data.previousExpiryDate);
    if (!prevExpiry) errors.push("previousExpiryDate must be a valid date");
  }

  if (data.declaration !== true) errors.push("declaration must be accepted");

  return { errors };
}

function validateVolunteer(data) {
  const errors = [];
  requireFields(
    data,
    [
      "fullName",
      "dateOfBirth",
      "gender",
      "mobile",
      "email",
      "city",
      "state",
      "country",
      "occupation",
    ],
    errors
  );

  const dob = parseDate(data.dateOfBirth);
  if (!dob) errors.push("dateOfBirth must be a valid date");

  if (data.declaration !== true) errors.push("declaration must be accepted");

  return { errors };
}

async function getMembershipType(typeCode) {
  const defaults = DEFAULT_TYPE_CONFIG[typeCode] || {
    name: typeCode,
    tier: 1,
    durationMonths: 12,
    fee: { amount: 0, currency: "INR" },
  };

  return MembershipType.findOneAndUpdate(
    { code: typeCode },
    { $setOnInsert: { code: typeCode, ...defaults } },
    { new: true, upsert: true }
  );
}

function computeEndDate(type, data, membershipTypeDoc) {
  const startDate = new Date();
  if (type === "student") {
    const duration = Number.parseInt(data.courseDuration, 10);
    const currentYear = Number.parseInt(data.currentYear, 10);
    const remainingYears = duration - currentYear + 1;
    return addMonths(startDate, remainingYears * 12);
  }

  const months = membershipTypeDoc?.durationMonths || DEFAULT_TYPE_CONFIG[MEMBERSHIP_TYPE_MAP[type]]?.durationMonths || 12;
  return addMonths(startDate, months);
}

function calculatePayment(type, data, membershipTypeDoc) {
  const country = String(data.country || "").trim();
  const isIndia = country.toLowerCase() === "india";
  const isLmic = [
    "Afghanistan", "Bangladesh", "Benin", "Bhutan", "Bolivia", "Burkina Faso", "Burundi",
    "Cambodia", "Cameroon", "Central African Republic", "Chad", "Comoros", "Congo",
    "Côte d'Ivoire", "Djibouti", "Egypt", "El Salvador", "Eritrea", "Eswatini", "Ethiopia",
    "Gambia", "Ghana", "Guatemala", "Guinea", "Guinea-Bissau", "Haiti", "Honduras",
    "India", "Indonesia", "Kenya", "Kiribati", "Kyrgyzstan", "Lao PDR", "Lesotho",
    "Liberia", "Madagascar", "Malawi", "Mali", "Mauritania", "Micronesia", "Moldova",
    "Mongolia", "Morocco", "Mozambique", "Myanmar", "Nepal", "Nicaragua", "Niger",
    "Nigeria", "North Korea", "Pakistan", "Papua New Guinea", "Philippines", "Rwanda",
    "São Tomé and Príncipe", "Senegal", "Sierra Leone", "Solomon Islands", "Somalia",
    "South Sudan", "Sri Lanka", "Sudan", "Syria", "Tajikistan", "Tanzania", "Timor-Leste",
    "Togo", "Tunisia", "Uganda", "Ukraine", "Uzbekistan", "Vanuatu", "Vietnam",
    "Yemen", "Zambia", "Zimbabwe",
  ].includes(country);

  const regionKey = isIndia ? "india" : isLmic ? "lmic" : "international";
  const feeConfig = membershipTypeDoc?.feeConfig || DEFAULT_TYPE_CONFIG[MEMBERSHIP_TYPE_MAP[type]]?.feeConfig || {};
  const regionFee = feeConfig.regionFees?.[regionKey];
  const studentPerYear = feeConfig.studentPerYearFees?.[regionKey];

  if (type === "student") {
    const duration = Number.parseInt(data.courseDuration, 10);
    const currentYear = Number.parseInt(data.currentYear, 10);
    const remainingYears = duration - currentYear + 1;
    const perYearAmount = studentPerYear?.amount ?? 0;
    const currency = studentPerYear?.currency || "INR";
    return { amount: perYearAmount * remainingYears, currency };
  }

  if (regionFee?.amount != null) {
    return { amount: regionFee.amount, currency: regionFee.currency || "INR" };
  }
  return { amount: 0, currency: "INR" };
}

function buildUpiPayload({ amount, currency, transactionId }) {
  const vpa = "gart@upi";
  const name = "GART Membership";
  const txn = transactionId ? `&tr=${encodeURIComponent(transactionId)}` : "";
  const amt = amount ? `&am=${encodeURIComponent(String(amount))}` : "";
  const cur = currency ? `&cu=${encodeURIComponent(currency)}` : "";
  return `upi://pay?pa=${encodeURIComponent(vpa)}&pn=${encodeURIComponent(name)}${amt}${cur}${txn}`;
}

async function quoteMembership(req, res) {
  const { membershipType, data = {} } = req.body || {};
  const normalizedType = String(membershipType || "").toLowerCase().trim();

  if (!normalizedType || !MEMBERSHIP_TYPE_MAP[normalizedType]) {
    return res.status(400).json({
      success: false,
      message: "membershipType must be student, therapist, allied, or volunteer",
    });
  }

  const user = await User.findById(req.auth?.sub);
  if (!user) {
    return res.status(404).json({ success: false, message: "User not found" });
  }
  const formEmail = String(data.email || "").toLowerCase().trim();
  if (formEmail && formEmail !== String(user.email).toLowerCase()) {
    return res.status(400).json({ success: false, message: "Email must match your account email" });
  }

  const existingMembership = await Membership.findOne({
    user: user._id,
    status: "active",
    endDate: { $gt: new Date() },
  });
  if (existingMembership) {
    return res.status(409).json({ success: false, message: "Active membership already exists" });
  }

  const pendingApplication = await MembershipApplication.findOne({
    user: user._id,
    status: { $in: ["submitted", "under_review"] },
  }).sort({ createdAt: -1 });
  if (pendingApplication) {
    return res.status(409).json({ success: false, message: "Membership application already pending" });
  }

  let validation;
  if (normalizedType === "student") {
    validation = validateStudent(data);
  } else if (normalizedType === "volunteer") {
    validation = validateVolunteer(data);
  } else {
    validation = validateProfessional(data);
  }

  if (validation.errors.length) {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: validation.errors,
    });
  }

  const typeCode = MEMBERSHIP_TYPE_MAP[normalizedType];
  const membershipTypeDoc = await getMembershipType(typeCode);
  const endDate = computeEndDate(normalizedType, data, membershipTypeDoc);
  const payment = calculatePayment(normalizedType, data, membershipTypeDoc);
  const qrPayload = buildUpiPayload({ amount: payment.amount, currency: payment.currency });

  return res.json({
    success: true,
    amount: payment.amount,
    currency: payment.currency,
    endDate,
    qrPayload,
  });
}

async function applyMembership(req, res) {
  const membershipType = req.body?.membershipType;
  const data = req.body?.data ? JSON.parse(req.body.data) : {};
  const paymentInput = req.body?.payment ? JSON.parse(req.body.payment) : {};
  const normalizedType = String(membershipType || "").toLowerCase().trim();

  if (!normalizedType || !MEMBERSHIP_TYPE_MAP[normalizedType]) {
    return res.status(400).json({
      success: false,
      message: "membershipType must be student, therapist, allied, or volunteer",
    });
  }

  const user = await User.findById(req.auth?.sub);
  if (!user) {
    return res.status(404).json({ success: false, message: "User not found" });
  }
  const formEmail = String(data.email || "").toLowerCase().trim();
  if (formEmail && formEmail !== String(user.email).toLowerCase()) {
    return res.status(400).json({ success: false, message: "Email must match your account email" });
  }

  const existingMembership = await Membership.findOne({
    user: user._id,
    status: "active",
    endDate: { $gt: new Date() },
  });
  if (existingMembership) {
    return res.status(409).json({ success: false, message: "Active membership already exists" });
  }

  const pendingApplication = await MembershipApplication.findOne({
    user: user._id,
    status: { $in: ["submitted", "under_review"] },
  }).sort({ createdAt: -1 });
  if (pendingApplication) {
    return res.status(409).json({ success: false, message: "Membership application already pending" });
  }

  const now = new Date();
  let validation;
  if (normalizedType === "student") {
    validation = validateStudent(data);
  } else if (normalizedType === "volunteer") {
    validation = validateVolunteer(data);
  } else {
    validation = validateProfessional(data);
  }

  if (validation.errors.length) {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: validation.errors,
    });
  }

  if (!isNonEmptyString(paymentInput.transactionId)) {
    return res.status(400).json({ success: false, message: "transactionId is required" });
  }
  const paidAt = parseDate(paymentInput.paidAt);
  if (!paidAt) {
    return res.status(400).json({ success: false, message: "paidAt must be a valid date" });
  }

  const existingTxn = await Payment.findOne({ transactionId: paymentInput.transactionId });
  if (existingTxn) {
    return res.status(409).json({ success: false, message: "transactionId already used" });
  }

  const typeCode = MEMBERSHIP_TYPE_MAP[normalizedType];
  const membershipTypeDoc = await getMembershipType(typeCode);

  const endDate = computeEndDate(normalizedType, data, membershipTypeDoc);
  const paymentQuote = calculatePayment(normalizedType, data, membershipTypeDoc);
  const qrPayload = buildUpiPayload({
    amount: paymentQuote.amount,
    currency: paymentQuote.currency,
    transactionId: paymentInput.transactionId,
  });

  const attachments = {};
  const fileEntries = req.files || {};
  const mapFile = (key) => {
    const file = fileEntries[key]?.[0];
    if (!file) return null;
    return `/uploads/${file.filename}`;
  };

  attachments.studentPhoto = mapFile("studentPhoto");
  attachments.studentId = mapFile("studentId");
  attachments.professionalPhoto = mapFile("professionalPhoto");
  attachments.registrationCertificate = mapFile("registrationCertificate");
  attachments.renewalCertificate = mapFile("renewalCertificate");
  attachments.volunteerPhoto = mapFile("volunteerPhoto");
  attachments.nationalId = mapFile("nationalId");

  const application = await MembershipApplication.create({
    user: user._id,
    membershipType: membershipTypeDoc._id,
    status: "submitted",
    formData: { ...data, attachments },
    submittedAt: now,
    history: [{ status: "submitted", at: now }],
  });

  const paymentRecord = await Payment.create({
    application: application._id,
    user: user._id,
    amount: paymentQuote.amount,
    currency: paymentQuote.currency,
    transactionId: paymentInput.transactionId,
    paidAt,
    payerName: isNonEmptyString(paymentInput.payerName) ? paymentInput.payerName.trim() : undefined,
    screenshotUrl: isNonEmptyString(paymentInput.screenshotUrl) ? paymentInput.screenshotUrl.trim() : undefined,
    qrPayload,
  });

  application.payment = paymentRecord._id;
  await application.save();

  const adminEmail = process.env.ADMIN_EMAIL || "";
  try {
    await sendMembershipSubmissionEmail({
      to: user.email,
      applicationId: application._id.toString(),
      membershipType: membershipTypeDoc?.name || normalizedType,
      amount: paymentQuote.amount,
      currency: paymentQuote.currency,
    });
    await sendAdminMembershipNotification({
      to: adminEmail,
      applicantEmail: user.email,
      applicationId: application._id.toString(),
      membershipType: membershipTypeDoc?.name || normalizedType,
      amount: paymentQuote.amount,
      currency: paymentQuote.currency,
    });
  } catch (err) {
    console.warn("Membership notification email failed:", err?.message || err);
  }

  return res.status(201).json({
    success: true,
    applicationId: application._id,
    paymentId: paymentRecord._id,
    endDate,
  });
}

async function verifyPaymentAndApprove(req, res) {
  const { applicationId } = req.params;
  const application = await MembershipApplication.findById(applicationId).populate("membershipType");
  if (!application) {
    return res.status(404).json({ success: false, message: "Application not found" });
  }

  const payment = await Payment.findOne({ application: application._id });
  if (!payment) {
    return res.status(404).json({ success: false, message: "Payment not found" });
  }

  if (payment.status === "verified" && application.status === "approved") {
    return res.json({ success: true, message: "Already approved" });
  }

  const now = new Date();
  const typeCode = application.membershipType?.code || "STUDENT";
  const normalizedType = Object.keys(MEMBERSHIP_TYPE_MAP).find(
    (key) => MEMBERSHIP_TYPE_MAP[key] === typeCode
  ) || "student";
  const endDate = computeEndDate(normalizedType, application.formData || {}, application.membershipType);

  const membership = await Membership.create({
    user: application.user,
    membershipType: application.membershipType._id,
    application: application._id,
    status: "active",
    startDate: now,
    endDate,
  });

  await User.findByIdAndUpdate(application.user, { currentMembership: membership._id });

  payment.status = "verified";
  payment.verifiedAt = now;
  payment.verifiedBy = req.auth?.sub;
  await payment.save();

  application.status = "approved";
  application.decidedAt = now;
  application.decision = {
    approvedBy: req.auth?.sub,
  };
  application.history.push({ status: "approved", at: now, by: req.auth?.sub });
  await application.save();

  return res.json({
    success: true,
    membershipId: membership.membershipId,
    endDate,
  });
}

async function listApplications(req, res) {
  const status = String(req.query.status || "submitted").trim();
  const membershipType = String(req.query.membershipType || "").trim();
  const page = Math.max(1, Number.parseInt(req.query.page, 10) || 1);
  const pageSize = Math.min(100, Math.max(1, Number.parseInt(req.query.pageSize, 10) || 20));

  const filter = {};
  if (status) {
    filter.status = status;
  }

  if (membershipType) {
    const normalizedType = membershipType.toLowerCase();
    const code = MEMBERSHIP_TYPE_MAP[normalizedType] || membershipType.toUpperCase();
    const typeDoc = await MembershipType.findOne({ code });
    if (typeDoc) {
      filter.membershipType = typeDoc._id;
    } else {
      return res.json({ success: true, applications: [], page, pageSize, total: 0 });
    }
  }

  const total = await MembershipApplication.countDocuments(filter);
  const applications = await MembershipApplication.find(filter)
    .populate("user", "email profile")
    .populate("membershipType", "name code tier")
    .populate("payment")
    .sort({ createdAt: -1 })
    .skip((page - 1) * pageSize)
    .limit(pageSize);

  return res.json({ success: true, applications, page, pageSize, total });
}

async function getApplication(req, res) {
  const { applicationId } = req.params;
  const application = await MembershipApplication.findById(applicationId)
    .populate("user", "email profile")
    .populate("membershipType", "name code tier")
    .populate("payment");

  if (!application) {
    return res.status(404).json({ success: false, message: "Application not found" });
  }

  return res.json({ success: true, application });
}

async function rejectApplication(req, res) {
  const { applicationId } = req.params;
  const reason = String(req.body?.reason || "").trim();

  if (!reason) {
    return res.status(400).json({ success: false, message: "Rejection reason is required" });
  }

  const application = await MembershipApplication.findById(applicationId);
  if (!application) {
    return res.status(404).json({ success: false, message: "Application not found" });
  }

  const payment = await Payment.findOne({ application: application._id });
  if (!payment) {
    return res.status(404).json({ success: false, message: "Payment not found" });
  }

  const now = new Date();

  payment.status = "rejected";
  payment.rejectedAt = now;
  payment.rejectionReason = reason;
  payment.verifiedBy = req.auth?.sub;
  await payment.save();

  application.status = "rejected";
  application.decidedAt = now;
  application.decision = {
    rejectedBy: req.auth?.sub,
    reason,
  };
  application.history.push({ status: "rejected", at: now, by: req.auth?.sub, note: reason });
  await application.save();

  return res.json({ success: true });
}

async function getMyLatestApplication(req, res) {
  const application = await MembershipApplication.findOne({ user: req.auth?.sub })
    .populate("membershipType", "name code tier")
    .populate("payment")
    .sort({ createdAt: -1 });

  if (!application) {
    return res.json({ success: true, application: null });
  }

  return res.json({ success: true, application });
}

async function getMyCurrentMembership(req, res) {
  const membership = await Membership.findOne({
    user: req.auth?.sub,
    status: "active",
    endDate: { $gt: new Date() },
  }).populate("membershipType", "name code tier");

  if (!membership) {
    return res.json({ success: true, membership: null });
  }

  return res.json({
    success: true,
    membership: {
      id: membership.membershipId,
      status: membership.status,
      startDate: membership.startDate,
      endDate: membership.endDate,
      membershipType: membership.membershipType,
    },
  });
}

module.exports = {
  applyMembership,
  quoteMembership,
  verifyPaymentAndApprove,
  listApplications,
  getApplication,
  rejectApplication,
  getMyLatestApplication,
  getMyCurrentMembership,
};

const prisma = require("../config/prisma");

async function getAllFeedback() {
  try {
    const feedbacks = await prisma.feedback.findMany({
      select: {
        nama: true,
        email: true,
        telepon: true,
        masukan: true,
      },
    });
    return feedbacks;
  } catch (err) {
    throw err;
  }
}

async function createFeedback(review) {
  const { nama, email, telepon, masukan } = review;
  try {
    await prisma.review.create({
      data: {
        nama,
        email,
        telepon,
        masukan,
      },
    });
  } catch (err) {
    throw err;
  }
}

module.exports = {
  getAllFeedback,
  createFeedback,
};
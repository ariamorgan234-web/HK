// server/utils/mailer.js - البديل باستخدام axios
const axios = require('axios');

const sendNewEstimateNotification = async (estimateData) => {
  try {
    console.log('🚀 بدء إرسال البريد عبر Brevo API...');

    if (!process.env.BREVO_API_KEY) {
      throw new Error('BREVO_API_KEY غير موجود في متغيرات البيئة');
    }

    const emailData = {
      sender: {
        name: 'HK Construction Site',
        email: process.env.EMAIL_FROM,
      },
      to: [
        {
          email: process.env.EMAIL_TO,
          name: 'Site Owner',
        },
      ],
      subject: `New Estimate Request from ${estimateData.name}`,
      htmlContent: `
        <h1>New Estimate Request!</h1>
        <p>You have received a new estimate request from your website.</p>
        <h2>Client Details:</h2>
        <ul>
          <li><strong>Name:</strong> ${estimateData.name}</li>
          <li><strong>Phone:</strong> ${estimateData.phone}</li>
          <li><strong>Email:</strong> ${
            estimateData.email || 'Not provided'
          }</li>
        </ul>
        <h2>Message:</h2>
        <p>${estimateData.message}</p>
      `,
    };

    const response = await axios.post(
      'https://api.brevo.com/v3/smtp/email',
      emailData,
      {
        headers: {
          'api-key': process.env.BREVO_API_KEY,
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      }
    );

    console.log('✅ تم إرسال البريد بنجاح:', response.data.messageId);
    return {
      success: true,
      messageId: response.data.messageId,
    };
  } catch (error) {
    console.error('❌ خطأ في Brevo API:');

    if (error.response) {
      console.error('📋 تفاصيل الخطأ:', error.response.data);
      console.error('🧾 كود الحالة:', error.response.status);
    } else {
      console.error('📋 الخطأ:', error.message);
    }

    return {
      success: false,
      error: error.response?.data || error.message,
    };
  }
};

module.exports = {
  sendNewEstimateNotification,
};

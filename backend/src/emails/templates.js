function otpEmailTemplate({ otp, userName, expiresInMinutes = 10, companyName = 'Kairos' }) {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin:0;padding:0;background-color:#f4f5f7;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f5f7;padding:40px 20px;">
    <tr>
      <td align="center">
        <table width="480" cellpadding="0" cellspacing="0" style="background-color:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.08);">
          
          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg,#1a73e8,#0d47a1);padding:32px 40px;text-align:center;">
              <h1 style="color:#ffffff;margin:0;font-size:22px;font-weight:600;letter-spacing:0.5px;">${companyName}</h1>
              <p style="color:rgba(255,255,255,0.85);margin:8px 0 0 0;font-size:14px;">Employee Management System</p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:40px;">
              <p style="color:#333;font-size:16px;margin:0 0 8px 0;">Hi${userName ? ' ' + userName : ''},</p>
              <p style="color:#666;font-size:14px;margin:0 0 24px 0;line-height:1.6;">
                Use the following OTP to complete your action. This code is valid for 
                <strong style="color:#333;">${expiresInMinutes} minutes</strong>.
              </p>

              <!-- OTP Box -->
              <table cellpadding="0" cellspacing="0" style="margin:0 auto 24px auto;">
                <tr>
                  <td style="background-color:#f0f5ff;border-radius:8px;padding:20px 40px;text-align:center;border:1px dashed #1a73e8;">
                    <span style="font-size:36px;font-weight:700;letter-spacing:8px;color:#1a73e8;font-family:'Courier New',monospace;">${otp}</span>
                  </td>
                </tr>
              </table>

              <!-- Security Notice -->
              <table cellpadding="0" cellspacing="0" style="background-color:#fff8e1;border-radius:8px;padding:16px;margin-bottom:24px;">
                <tr>
                  <td valign="top" style="font-size:16px;padding-right:8px;">⚠️</td>
                  <td>
                    <p style="color:#8d6e00;font-size:13px;margin:0;line-height:1.5;">
                      <strong>Security:</strong> Never share this OTP with anyone. 
                      We will never ask for your OTP outside of this portal.
                    </p>
                  </td>
                </tr>
              </table>

              <p style="color:#999;font-size:12px;margin:0;line-height:1.5;">
                If you did not request this code, please ignore this email or contact your administrator.
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color:#f8f9fa;padding:20px 40px;text-align:center;border-top:1px solid #e9ecef;">
              <p style="color:#999;font-size:12px;margin:0;line-height:1.5;">
                ${companyName} &bull; Employee Management System<br>
                This is an automated message. Please do not reply.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

function forgotPasswordEmailTemplate({ otp, userName, expiresInMinutes = 5, companyName = 'Kairos' }) {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin:0;padding:0;background-color:#f4f5f7;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f5f7;padding:40px 20px;">
    <tr>
      <td align="center">
        <table width="480" cellpadding="0" cellspacing="0" style="background-color:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.08);">
          
          <tr>
            <td style="background:linear-gradient(135deg,#e65100,#bf360c);padding:32px 40px;text-align:center;">
              <h1 style="color:#ffffff;margin:0;font-size:22px;font-weight:600;">Password Reset</h1>
              <p style="color:rgba(255,255,255,0.85);margin:8px 0 0 0;font-size:14px;">${companyName}</p>
            </td>
          </tr>

          <tr>
            <td style="padding:40px;">
              <p style="color:#333;font-size:16px;margin:0 0 8px 0;">Hi${userName ? ' ' + userName : ''},</p>
              <p style="color:#666;font-size:14px;margin:0 0 24px 0;line-height:1.6;">
                We received a request to reset your password. Use the OTP below to proceed.
                This code expires in <strong style="color:#333;">${expiresInMinutes} minutes</strong>.
              </p>

              <table cellpadding="0" cellspacing="0" style="margin:0 auto 24px auto;">
                <tr>
                  <td style="background-color:#fff3e0;border-radius:8px;padding:20px 40px;text-align:center;border:1px dashed #e65100;">
                    <span style="font-size:36px;font-weight:700;letter-spacing:8px;color:#e65100;font-family:'Courier New',monospace;">${otp}</span>
                  </td>
                </tr>
              </table>

              <table cellpadding="0" cellspacing="0" style="background-color:#fff8e1;border-radius:8px;padding:16px;margin-bottom:24px;">
                <tr>
                  <td valign="top" style="font-size:16px;padding-right:8px;">⚠️</td>
                  <td>
                    <p style="color:#8d6e00;font-size:13px;margin:0;line-height:1.5;">
                      <strong>Security:</strong> Never share this OTP with anyone. 
                      If you did not request this, please secure your account immediately.
                    </p>
                  </td>
                </tr>
              </table>

              <p style="color:#999;font-size:12px;margin:0;line-height:1.5;">
                If you did not request a password reset, please ignore this email or contact your administrator.
              </p>
            </td>
          </tr>

          <tr>
            <td style="background-color:#f8f9fa;padding:20px 40px;text-align:center;border-top:1px solid #e9ecef;">
              <p style="color:#999;font-size:12px;margin:0;line-height:1.5;">
                ${companyName} &bull; Employee Management System<br>
                This is an automated message. Please do not reply.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

module.exports = { otpEmailTemplate, forgotPasswordEmailTemplate };

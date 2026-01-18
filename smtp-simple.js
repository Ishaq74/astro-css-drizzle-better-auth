import nodemailer from 'nodemailer';

// Hardcoded for absolute isolation
// Testing ALTERNATIVE config: Port 587 + STARTTLS + smtp.ionos.com
const config = {
    host: 'smtp.ionos.com',
    port: 587,
    secure: false, // TLS/STARTTLS
    requireTLS: true,
    auth: {
        user: 'contact@zatchouli.fr',
        pass: 'Tartare+74613'
    },
    tls: {
        rejectUnauthorized: false // Be permissive
    },
    debug: true,
    logger: true
};

async function test() {
    console.log('--- SIMPLE SMTP TEST (IONOS.COM + 587) ---');
    try {
        const transporter = nodemailer.createTransport(config);
        await transporter.verify();
        console.log('✅ Success!');
    } catch (err) {
        console.error('❌ Failed:', err.message);
        console.error('Code:', err.code);
        console.error('Response:', err.response);
    }
}

test();

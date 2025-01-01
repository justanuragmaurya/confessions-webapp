import * as bcrypt from 'bcrypt';

async function hashPassword() {
    const password = '1234';
    const saltRounds = 10;
    
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    console.log('Hashed password:', hashedPassword);
}

hashPassword().catch(console.error);
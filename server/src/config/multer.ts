import multer from 'multer';
import path from 'path';
import crypto from 'crypto';

export default {
    storage: multer.diskStorage({
        destination: path.resolve(__dirname, '..', '..', 'uploads'),
        filename(request, file, callback) {
            const hash = crypto.randomBytes(6).toString('hex');

            // Aqui modificamos o nome original da imagem enviada pelo usuário
            // Ela se torna "única", por meio da junção do hash ao nome original
            const fileName = `${hash}-${file.originalname}`;

            callback(null, fileName);
        }
    })
}
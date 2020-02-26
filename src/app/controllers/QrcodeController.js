import Qrcode from '../models/Qrcode';

class QrcodeController {
  async store(req, res) {
    const { originalname: name, filename: path } = req.file;
    const { idsurveys } = req.body;

    const qrcode = await Qrcode.create({
      name,
      path,
      idsurveys,
    });

    return res.json(qrcode);
  }
}

export default new QrcodeController();

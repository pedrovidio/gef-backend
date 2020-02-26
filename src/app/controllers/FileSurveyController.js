import FileSurvey from '../models/FileSurvey';

class FileSurveyController {
  async store(req, res) {
    const { originalname: name, filename: path } = req.file;
    const { idsurveys } = req.body;

    const fileSurvey = await FileSurvey.create({
      name,
      path,
      idsurveys,
    });

    return res.json(fileSurvey);
  }
}

export default new FileSurveyController();

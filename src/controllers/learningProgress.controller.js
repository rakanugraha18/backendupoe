import LearningProgressService from "../services/learningProgress.service.js";

class LearningProgressController {
  static async getUserLearningProgress(req, res) {
    try {
      const userId = req.params.id;
      const progress = await LearningProgressService.getUserLearningProgress(
        userId
      );

      res.json({
        success: true,
        statusCode: 200,
        message: "User learning progress retrieved",
        data: progress,
      });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
}

export default LearningProgressController;

import db from "../db/index.js";
import AppError from "../utils/AppError.js";

class MarkRepository {
  constructor() {}

  async findMarksByStudentId(id) {
    try {
      if (!id) throw new AppError("Missing student ID.", 400);

      const marks = await db("public.student_marks as m").select("*").where("m.student_id", id);
      return marks;
    } catch (error) {
      throw error;
    }
  }

  async findOneById(id) {
    try {
      if (!id) throw new AppError("Missing mark ID.", 400);

      const mark = await db("public.student_marks as m").select("*").where("m.id", id).first();

      if (!mark) throw new AppError("Mark not found", 404);

      return mark;
    } catch (error) {
      throw error;
    }
  }

  async insertOne(studentId, { subject, score }) {
    try {
      if (!studentId) throw new AppError("Missing Student ID", 400);
      if (!subject || !score) throw new AppError("All fields are required", 400);

      const [mark] = await db("public.student_marks")
        .insert({
          subject,
          score,
          student_id: studentId,
        })
        .returning("*");
      if (!mark) throw new AppError("Error in inserting a student mark.", 500);
      return mark;
    } catch (error) {
      throw error;
    }
  }

  async findByIdAndUpdate(id, { subject, score }) {
    try {
      if (!id) throw new AppError("Mark ID is required", 400);

      const [updatedMark] = await db("public.student_marks")
        .where("id", id)
        .update({
          subject,
          score,
          updated_at: db.fn.now(),
        })
        .returning("*");

      if (!updatedMark) throw new AppError("Mark not found", 404);

      return updatedMark;
    } catch (error) {
      throw error;
    }
  }

  async findByIdAndDelete(id) {
    try {
      if (!id) throw new AppError("Mark ID is required", 400);

      const deleteCount = await db("public.student_marks").where("id", id).delete();

      if (deleteCount === 0) throw new AppError("Mark not found", 404);

      return { success: true, deletedCount: deleteCount };
    } catch (error) {
      throw error;
    }
  }
}

export default new MarkRepository();

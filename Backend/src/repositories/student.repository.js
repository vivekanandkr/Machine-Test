import db from "../db/index.js";
import AppError from "../utils/AppError.js";

class StudentRepository {
  constructor() {}

  #age_expr = `date_part('year', AGE(s.date_of_birth)) as age`;

  async findAll(filter = {}) {
    try {
      const page = parseInt(filter?.page) || 1;
      const limit = parseInt(filter?.limit) || 10;
      const offset = (page - 1) * limit;

      const query = db("public.students as s");

      if (filter.name) {
        query.whereILike("s.name", `%${filter.name}%`);
      }

      const countResult = await query.clone().count("* as total");
      const totalCount = parseInt(countResult[0].total);

      query.select("*", db.raw(this.#age_expr)).limit(limit).offset(offset);

      if (filter.sortBy) {
        query.orderBy(filter.sortBy, filter.order || "asc");
      } else {
        query.orderBy("s.id", "asc");
      }

      const data = await query;

      return {
        data,
        totalCount,
        totalPages: Math.ceil(totalCount / limit),
        currentPage: page,
        limit,
      };
    } catch (error) {
      throw error;
    }
  }

  async findById(id) {
    try {
      if (!id) throw new AppError("Missing student ID.", 400);

      const student = await db("public.students as s").select("*", db.raw(this.#age_expr)).where("s.id", id).first();

      if (!student) throw new AppError("Student not found", 404);

      return student;
    } catch (error) {
      throw error;
    }
  }

  async insertOne({ name, roll_no, standard, date_of_birth }) {
    try {
      if (!name || !roll_no || !standard || !date_of_birth) {
        throw new AppError("All fields are required", 400);
      }
      const [student] = await db("public.students")
        .insert({
          name,
          roll_no,
          standard,
          date_of_birth,
        })
        .returning("*");
      if (!student) throw new AppError("Error in inserting a student.", 500);
      return student;
    } catch (error) {
      throw error;
    }
  }

  async findByIdAndUpdate(id, { name, roll_no, standard, date_of_birth }) {
    try {
      if (!id) throw new AppError("Student ID is required", 400);

      const [updatedStudent] = await db("public.students")
        .where("id", id)
        .update({
          name,
          roll_no,
          standard,
          date_of_birth,
          updated_at: db.fn.now(),
        })
        .returning("*");

      if (!updatedStudent) throw new AppError("Student not found", 404);

      return updatedStudent;
    } catch (error) {
      throw error;
    }
  }

  async findByIdAndDelete(id) {
    try {
      if (!id) throw new AppError("Student ID is required", 400);

      const deleteCount = await db("public.students").where("id", id).delete();

      if (deleteCount === 0) throw new AppError("Student not found", 404);

      return { success: true, deletedCount: deleteCount };
    } catch (error) {
      throw error;
    }
  }
}

export default new StudentRepository();

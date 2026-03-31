import markRepository from "../repositories/mark.repository.js";

export const createMark = async (req, res, next) => {
  try {
    const data = req.validatedData;
    const student_id = req.params.student_id;
    const student_mark = await markRepository.insertOne(student_id, data);
    return res.status(201).json({
      statusCode: 201,
      message: "Student Mark created successfully",
      data: student_mark,
    });
  } catch (error) {
    next(error);
  }
};

export const getStudentMarks = async (req, res, next) => {
  try {
    const student_id = req.params.student_id;
    const marks = await markRepository.findMarksByStudentId(student_id);
    return res.status(200).json({
      data: marks,
      statusCode: 200,
    });
  } catch (error) {
    next(error);
  }
};

export const getMarkById = async (req, res, next) => {
  try {
    const Id = req.params.id;
    const mark = await markRepository.findOneById(Id);
    return res.status(200).json({
      statusCode: 200,
      data: mark,
    });
  } catch (error) {
    next(error);
  }
};

export const updateMark = async (req, res, next) => {
  try {
    const Id = req.params.id;
    const data = req.validatedData;
    const mark = await markRepository.findByIdAndUpdate(Id, data);
    return res.status(200).json({
      statusCode: 200,
      message: "Mark updated successfully",
      data: mark,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteMark = async (req, res, next) => {
  try {
    const Id = req.params.id;
    await markRepository.findByIdAndDelete(Id);
    return res.status(204).json({
      statusCode: 204,
      message: "Mark deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

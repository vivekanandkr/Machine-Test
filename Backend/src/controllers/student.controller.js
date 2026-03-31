import studentRepository from "../repositories/student.repository.js";

export const createStudent = async (req, res, next) => {
  try {
    const data = req.validatedData;
    const student = await studentRepository.insertOne(data);
    return res.status(201).json({
      statusCode: 201,
      message: "Student created successfully",
      data: student,
    });
  } catch (error) {
    next(error);
  }
};

export const getStudents = async (req, res, next) => {
  try {
    const filters = req.validatedData;
    const result = await studentRepository.findAll(filters);
    return res.status(200).json({
      statusCode: 200,
      ...result,
    });
  } catch (error) {
    next(error);
  }
};

export const getStudentById = async (req, res, next) => {
  try {
    const Id = req.params.id;
    const student = await studentRepository.findById(Id);
    return res.status(200).json({
      statusCode: 200,
      data: student,
    });
  } catch (error) {
    next(error);
  }
};

export const updateStudent = async (req, res, next) => {
  try {
    const Id = req.params.id;
    const data = req.validatedData;
    const student = await studentRepository.findByIdAndUpdate(Id, data);
    return res.status(200).json({
      statusCode: 200,
      message: "Student updated successfully",
      data: student,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteStudent = async (req, res, next) => {
  try {
    const Id = req.params.id;
    await studentRepository.findByIdAndDelete(Id);
    return res.status(204).json({
      statusCode: 204,
      message: "Student deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

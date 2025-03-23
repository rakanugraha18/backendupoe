const successResponse = (data, message = "Success", statusCode = 200) => {
  try {
    const jsonData = JSON.parse(JSON.stringify(data)); // 🔹 Hilangkan referensi siklikal
    return {
      success: true,
      statusCode,
      message,
      data: jsonData,
    };
  } catch (error) {
    console.error("Error serializing response:", error);
    return {
      success: false,
      message: "Internal Server Error",
    };
  }
};

export default successResponse;

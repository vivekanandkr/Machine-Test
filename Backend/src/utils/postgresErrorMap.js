/**
 * PostgreSQL Error Codes Map
 * Reference: https://www.postgresql.org/docs/current/errcodes-appendix.html
 */

export const postgresErrorMap = {
  // ===== INTEGRITY CONSTRAINT VIOLATIONS (23xxx) =====
  23505: {
    name: "unique_violation",
    message: "Unique constraint violation",
    statusCode: 409,
    userMessage: "This value already exists",
  },
  23503: {
    name: "foreign_key_violation",
    message: "Foreign key constraint violation",
    statusCode: 409,
    userMessage: "Referenced record does not exist",
  },
  23502: {
    name: "not_null_violation",
    message: "Not null constraint violation",
    statusCode: 400,
    userMessage: "Required field is missing",
  },
  23514: {
    name: "check_violation",
    message: "Check constraint violation",
    statusCode: 400,
    userMessage: "Value does not meet validation criteria",
  },
  23001: {
    name: "restrict_violation",
    message: "Restrict violation",
    statusCode: 409,
    userMessage: "Cannot delete record due to dependencies",
  },

  // ===== DATA EXCEPTIONS (22xxx) =====
  22007: {
    name: "invalid_datetime_format",
    message: "Invalid datetime format",
    statusCode: 400,
    userMessage: "Date/time format is invalid",
  },
  22008: {
    name: "datetime_field_overflow",
    message: "Datetime field overflow",
    statusCode: 400,
    userMessage: "Date/time value out of range",
  },
  22012: {
    name: "division_by_zero",
    message: "Division by zero",
    statusCode: 400,
    userMessage: "Invalid calculation (division by zero)",
  },
  "22P02": {
    name: "invalid_text_representation",
    message: "Invalid text representation",
    statusCode: 400,
    userMessage: "Data format is invalid",
  },
  "22P03": {
    name: "invalid_binary_representation",
    message: "Invalid binary representation",
    statusCode: 400,
    userMessage: "Binary data format is invalid",
  },
  "2202E": {
    name: "array_subscript_error",
    message: "Array subscript error",
    statusCode: 400,
    userMessage: "Invalid array index",
  },
  22016: {
    name: "invalid_argument_for_sql_function",
    message: "Invalid argument for SQL function",
    statusCode: 400,
    userMessage: "Function argument is invalid",
  },
  "2200B": {
    name: "escape_character_conflict",
    message: "Escape character conflict",
    statusCode: 400,
    userMessage: "Invalid escape sequence",
  },
  22004: {
    name: "null_value_not_allowed",
    message: "Null value not allowed in data type",
    statusCode: 400,
    userMessage: "Null value is not allowed",
  },

  // ===== SYNTAX ERROR / ACCESS VIOLATION (42xxx) =====
  42601: {
    name: "syntax_error",
    message: "Syntax error in SQL statement",
    statusCode: 400,
    userMessage: "Database query syntax error",
  },
  42703: {
    name: "undefined_column",
    message: "Undefined column",
    statusCode: 400,
    userMessage: "Column does not exist",
  },
  42704: {
    name: "undefined_object",
    message: "Undefined object",
    statusCode: 400,
    userMessage: "Database object does not exist",
  },
  "42P01": {
    name: "undefined_table",
    message: "Undefined table",
    statusCode: 400,
    userMessage: "Table does not exist",
  },
  "42P02": {
    name: "undefined_parameter",
    message: "Undefined parameter",
    statusCode: 400,
    userMessage: "Parameter does not exist",
  },
  42302: {
    name: "undefined_function",
    message: "Undefined function",
    statusCode: 400,
    userMessage: "Function does not exist",
  },
  42712: {
    name: "duplicate_object",
    message: "Duplicate object",
    statusCode: 409,
    userMessage: "Object already exists",
  },
  42701: {
    name: "duplicate_column",
    message: "Duplicate column",
    statusCode: 409,
    userMessage: "Column already exists",
  },
  "42P04": {
    name: "duplicate_database",
    message: "Duplicate database",
    statusCode: 409,
    userMessage: "Database already exists",
  },
  42939: {
    name: "reserved_name",
    message: "Reserved name",
    statusCode: 400,
    userMessage: "Cannot use reserved name",
  },
  42703: {
    name: "ambiguous_column",
    message: "Ambiguous column",
    statusCode: 400,
    userMessage: "Column reference is ambiguous",
  },

  // ===== CONNECTION EXCEPTIONS (08xxx) =====
  "08000": {
    name: "connection_exception",
    message: "Connection exception",
    statusCode: 503,
    userMessage: "Database connection error",
  },
  "08003": {
    name: "connection_does_not_exist",
    message: "Connection does not exist",
    statusCode: 503,
    userMessage: "Database connection lost",
  },
  "08006": {
    name: "connection_failure",
    message: "Connection failure",
    statusCode: 503,
    userMessage: "Cannot connect to database",
  },
  "08001": {
    name: "sqlclient_unable_to_establish_sqlconnection",
    message: "Unable to establish connection",
    statusCode: 503,
    userMessage: "Database temporarily unavailable",
  },
  "08004": {
    name: "sqlserver_rejected_establishment_of_sqlconnection",
    message: "Server rejected connection",
    statusCode: 503,
    userMessage: "Database server rejected connection",
  },

  // ===== TRANSACTION ROLLBACK (40xxx) =====
  40000: {
    name: "transaction_rollback",
    message: "Transaction rollback",
    statusCode: 409,
    userMessage: "Transaction was rolled back",
  },
  40001: {
    name: "serialization_failure",
    message: "Serialization failure",
    statusCode: 409,
    userMessage: "Transaction conflict - please retry",
  },
  40002: {
    name: "transaction_integrity_constraint_violation",
    message: "Transaction integrity constraint violation",
    statusCode: 409,
    userMessage: "Transaction violates constraints",
  },
  40003: {
    name: "statement_completion_unknown",
    message: "Statement completion unknown",
    statusCode: 503,
    userMessage: "Transaction status unknown",
  },

  // ===== INVALID TRANSACTION STATE (25xxx) =====
  25000: {
    name: "invalid_transaction_state",
    message: "Invalid transaction state",
    statusCode: 400,
    userMessage: "Invalid transaction state",
  },
  25001: {
    name: "active_sql_transaction",
    message: "Active SQL transaction",
    statusCode: 400,
    userMessage: "Cannot start new transaction",
  },
  25002: {
    name: "branch_transaction_already_active",
    message: "Branch transaction already active",
    statusCode: 400,
    userMessage: "Nested transaction not allowed",
  },

  // ===== AUTHORIZATION / PERMISSION (28xxx & 42xxx) =====
  28000: {
    name: "invalid_authorization_specification",
    message: "Invalid authorization specification",
    statusCode: 401,
    userMessage: "Authentication failed",
  },
  "28P01": {
    name: "invalid_password",
    message: "Invalid password",
    statusCode: 401,
    userMessage: "Invalid credentials",
  },
  42501: {
    name: "insufficient_privilege",
    message: "Insufficient privilege",
    statusCode: 403,
    userMessage: "Permission denied",
  },

  // ===== RESOURCE LIMITS (54xxx) =====
  54000: {
    name: "program_limit_exceeded",
    message: "Program limit exceeded",
    statusCode: 413,
    userMessage: "Request too large",
  },
  54001: {
    name: "statement_too_complex",
    message: "Statement too complex",
    statusCode: 400,
    userMessage: "Query too complex",
  },

  // ===== INSUFFICIENT RESOURCES (53xxx) =====
  53000: {
    name: "insufficient_resources",
    message: "Insufficient resources",
    statusCode: 503,
    userMessage: "Database resources exhausted",
  },
  53100: {
    name: "disk_full",
    message: "Disk full",
    statusCode: 503,
    userMessage: "Database storage full",
  },
  53200: {
    name: "out_of_memory",
    message: "Out of memory",
    statusCode: 503,
    userMessage: "Database out of memory",
  },
  53300: {
    name: "too_many_connections",
    message: "Too many connections",
    statusCode: 503,
    userMessage: "Database connection pool exhausted",
  },
};

export const handleDatabaseError = (error) => {
  const errorInfo = postgresErrorMap[error.code] || {
    name: "database_error",
    userMessage: "An unexpected database error occurred",
    statusCode: 500,
  };

  return {
    statusCode: errorInfo.statusCode,
    message: errorInfo.userMessage,
    error: errorInfo.name,
    code: error.code,
  };
};

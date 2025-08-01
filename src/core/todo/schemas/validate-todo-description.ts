type ValidateTodoDescriptions = {
  success: boolean;
  errors: string[];
};

export function validateTodoDescription(
  description: string
): ValidateTodoDescriptions {
  const errors: string[] = [];
  if (description.length < 5 || description.length > 100) {
    errors.push("Descrição deve ter entre 5 e 100 caracteres");
  }
  
  return {
    success: errors.length === 0,
    errors,
  };
}

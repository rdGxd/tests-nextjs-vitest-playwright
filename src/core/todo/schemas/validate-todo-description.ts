type ValidateTodoDescriptions = {
  success: boolean;
  errors: string[];
};

export function validateTodoDescription(
  description: string,
): ValidateTodoDescriptions {
  const errors: string[] = [];
  if (description.length <= 3 || description.length > 100) {
    errors.push('Descrição precisa ter mais de 3 caracteres');
  }

  return {
    success: errors.length === 0,
    errors,
  };
}

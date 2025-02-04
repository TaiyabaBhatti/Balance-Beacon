import React from 'react'

export default function InputField(
{
    label,
    id,
    type = "text",
    placeholder = "",
    register,
    validationRules = {},
    errorMessage,
    disabled = false,
    className = "",
}

) {

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm();




  return (
    <div className="flex flex-col gap-y-1 ">


      
    </div>
  )
}

/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "./ui/button";
import { Modal, ModalContent, ModalTitle, ModalTrigger } from "./ui/modal";
import { useEffect, useState, useMemo } from "react";
import { Alert, AlertDescription } from "./ui/alert";

interface FormularioModalProps {
  className: string;
  title: string;
  name: string;
  inputs: {
    label: string;
    type: string;
    placeholder: string;
    id: string;
    defaultValue: any;
    required: boolean;
    options?: { value: string; label: string }[];
    dependsFrom?: {
      field: string;
      value: boolean;
    };
  }[];
  onSubmit: (data: Record<string, any>) => void;
}

export const FormularioModal = ({
  className,
  title,
  name,
  onSubmit,
  inputs,
}: FormularioModalProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const initialValues = useMemo(() => {
    const values: Record<string, any> = {};
    inputs.forEach((input) => {
      values[input.id] = input.defaultValue;
    });
    return values;
  }, [inputs]);

  const [formValues, setFormValues] =
    useState<Record<string, any>>(initialValues);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setFormValues(initialValues);
  }, [initialValues, isOpen]);

  const handleInputChange = (id: string, value: any) => {
    setFormValues((prev) => ({
      ...prev,
      [id]: value,
    }));
    setError(null); // Limpiar error cuando el usuario hace cambios
  };

  const shouldShowField = (input: (typeof inputs)[0]) => {
    if (!input.dependsFrom) return true;

    const dependentValue = formValues[input.dependsFrom.field];
    return dependentValue === input.dependsFrom.value;
  };

  const validateForm = () => {
    // Validar campos requeridos
    for (const input of inputs) {
      if (input.required && shouldShowField(input)) {
        const value = formValues[input.id];
        if (
          value === undefined ||
          value === "" ||
          (typeof value === "string" && value.trim() === "")
        ) {
          setError(`El campo ${input.label} es obligatorio`);
          return false;
        }
      }
    }
    // Validar que la fecha de nacimiento sea menor a la fecha actual
    const fechaNacimiento = new Date(formValues["fechaNacimiento"]);
    const fechaActual = new Date();
    if (fechaNacimiento > fechaActual) {
      setError("La fecha de nacimiento no puede ser mayor a la fecha actual");
      return false;
    }
    const fechaInicio = new Date(formValues["fechaInicioOcupacion"]);
    const fechaFin = new Date(formValues["fechaFinOcupacion"]);
    if (formValues["genero"]) {
      if (fechaInicio > fechaFin) {
        setError(
          "La fecha de inicio de ocupación no puede ser mayor a la fecha de fin de ocupación"
        );
        return false;
      }
      if (fechaFin && !fechaInicio) {
        setError(
          "La fecha de inicio de ocupación es obligatoria si la fecha de fin de ocupación es seleccionada"
        );
        return false;
      }
    }
    // Validar fechas en orden cronológico
    const dateInputs = inputs.filter(
      (input) => input.type === "date" && shouldShowField(input)
    );
    if (dateInputs.length >= 2) {
      const firstDate = new Date(formValues[dateInputs[0].id]);
      const secondDate = new Date(formValues[dateInputs[1].id]);

      if (secondDate < firstDate) {
        setError(
          `${dateInputs[1].label} no puede ser anterior a ${dateInputs[0].label}`
        );
        return false;
      }
    }

    return true;
  };

  return (
    <Modal open={isOpen} onOpenChange={setIsOpen}>
      <ModalTrigger asChild className={className}>
        <Button variant="outline">{name}</Button>
      </ModalTrigger>
      <ModalContent className="max-h-[90vh] overflow-y-auto max-w-[90vw] sm:max-w-[50vw]">
        <div className="grid gap-4">
          <ModalTitle>{title}</ModalTitle>
          <p className="text-sm text-gray-500">
            Todos los campos con * son obligatorios
          </p>

          <form className="grid gap-4">
            {inputs.map((input) =>
              shouldShowField(input) ? (
                <div key={input.id} className="flex flex-col gap-2">
                  <label htmlFor={input.id}>
                    {input.label}
                    {input.required && <span className="text-red-500">*</span>}
                  </label>
                  {input.type === "select" ? (
                    <select
                      id={input.id}
                      className="border p-2 rounded"
                      value={formValues[input.id]}
                      onChange={(e) =>
                        handleInputChange(input.id, e.target.value)
                      }
                      required={input.required}
                    >
                      <option value="">{input.placeholder}</option>
                      {input.options?.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <input
                      id={input.id}
                      type={input.type}
                      className={`border p-2 rounded ${
                        input.type === "checkbox" ? "w-5 h-5 self-start" : ""
                      }`}
                      placeholder={input.placeholder}
                      required={input.required}
                      checked={
                        input.type === "checkbox"
                          ? formValues[input.id]
                          : undefined
                      }
                      value={formValues[input.id]}
                      onChange={(e) =>
                        handleInputChange(
                          input.id,
                          input.type === "checkbox"
                            ? e.target.checked
                            : e.target.value
                        )
                      }
                    />
                  )}
                </div>
              ) : null
            )}
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <section className="flex flex-row gap-10 justify-end">
              <Button
                type="submit"
                onClick={(e) => {
                  e.preventDefault();
                  if (validateForm()) {
                    onSubmit(formValues);
                    setIsOpen(false);
                    setFormValues({});
                  }
                }}
              >
                Enviar
              </Button>
            </section>
          </form>
        </div>
      </ModalContent>
    </Modal>
  );
};

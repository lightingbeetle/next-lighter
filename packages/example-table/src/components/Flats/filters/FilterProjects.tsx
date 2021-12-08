import React from "react";
import { useFormContext } from "react-hook-form";
import useFlats from "../../../hooks/useFlats";
import { RadioCheck } from "components";

const FilterProjects = () => {
  const { register, handleSubmit } = useFormContext();
  const { filterShape, setFilter } = useFlats();

  return (
    <fieldset>
      <legend className="form-label">Projekt</legend>
      <div className="bar">
        {Object.entries(filterShape?.project)
          .filter(([project]) => project !== "")
          .map(([project, value]) => (
            <RadioCheck
              key={project}
              label={`Projekt ${project}`}
              type="checkbox"
              id={`project-${project}`}
              {...register(`projects`)}
              value={project}
              disabled={!value}
              onChange={(e) => {
                register("projects").onChange(e);
                handleSubmit(setFilter)();
              }}
            />
          ))}
      </div>
    </fieldset>
  );
};

export default FilterProjects;

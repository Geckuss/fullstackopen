// Course.jsx

import React from 'react';

const Header = ({ courseName }) => {
  return <h2>{courseName}</h2>;
};

const Part = ({ part }) => {
  return (
    <p key={part.id}>
      {part.name} {part.exercises}
    </p>
  );
};

const Content = ({ parts }) => {
  const totalExercises = parts.reduce((sum, part) => sum + part.exercises, 0);

  return (
    <div>
      {parts.map((part) => (
        <Part key={part.id} part={part} />
      ))}
      <p><strong>Total exercises: {totalExercises}</strong></p>
    </div>
  );
};

const Course = ({ course }) => {
  return (
    <div>
      <Header courseName={course.name} />
      <Content parts={course.parts} />
    </div>
  );
};

export default Course;
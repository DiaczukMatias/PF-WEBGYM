import EditPlanForm from '@/components/edit-plan/EditPlan';
import React from 'react';

const EditPlanPage: React.FC = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-900">
      <div className="bg-gray-800 text-white p-8 rounded-lg shadow-md w-[400px]">
        <h1 className="text-accent text-xl font-bold mb-6 text-center">
          Editar precio de planes
        </h1>
        <EditPlanForm />
      </div>
    </div>
  );
};

export default EditPlanPage;


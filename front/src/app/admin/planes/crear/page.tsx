import CrearPlanForm from "@/components/CrearPlan/CrearPlan";

export default function CrearPlanes() {
    return (
      <div className="flex  flex-col justify-center items-center text-center">
        <h1 className="text-accent text-3xl font-bold">Crear planes</h1>
        <CrearPlanForm/>
      </div>
    );
  }
  
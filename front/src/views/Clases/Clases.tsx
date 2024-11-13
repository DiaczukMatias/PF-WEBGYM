import ClassCardList from "@/components/CardList/CardList";
import Category from "@/components/Categories/Categories";
import { clasesData, categoriesData, profesoresData } from "@/helpers/datatemporalClases";
import Profesores from "@/components/Profesor/Profesor";


const ClasesView= () => {
    return (
      <div>
             <Category categories={categoriesData} />   
             <h2 className="flex justify-center font-bold font-sans text-xl text-accent m-4">CLASES:</h2>   
             <ClassCardList classes={clasesData} />
             <Profesores profesores={profesoresData} itemsPerPage={5}/>
         
      </div>
    );
  };
  
  export default ClasesView
  
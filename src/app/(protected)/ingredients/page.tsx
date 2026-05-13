import IngredientsForm from "@/app/forms/ingredients.form";
import PageContent from "@/app/components/common/page-content";
import IngredientsTable from "@/app/components/UI/tables/ingredients";

const IngredientsPage = () => {
  return (
    <div>
      <PageContent />
      <IngredientsForm />
      <IngredientsTable />
    </div>
  );
};

export default IngredientsPage;

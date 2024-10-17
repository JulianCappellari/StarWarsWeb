import { Pagination, PaginationItem, PaginationList, PaginationNavigator } from "keep-react";
import { CaretLeft, CaretRight } from "phosphor-react";

interface PaginationComponentProps {
  currentPage: number;
  totalPages: number;
  setCurrentPage: (page: number) => void;
  color: 'red' | 'blue' | 'green' | 'orange'; 
}

const colorClasses = {
  red: "text-red-500",
  blue: "text-blue-500",
  green: "text-green-500",
  orange: "text-orange-500",
};

const PaginationComponent: React.FC<PaginationComponentProps> = ({
  currentPage,
  totalPages,
  setCurrentPage,
  color
}) => {
  return (
    <div className="flex justify-center mt-[110px] animate__animated animate__zoomIn animate__delay-0.3s">
      <Pagination shape="rounded">
        <PaginationNavigator onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}>
          <CaretLeft size={18} />
          Anterior
        </PaginationNavigator>
        <PaginationList>
          {Array.from({ length: totalPages }, (_, index) => {
            const isActive = currentPage === index + 1;
            return (
              <PaginationItem
                key={index}
                active={isActive}
                className={isActive ? colorClasses[color] : "text-gray-300"} // Usar clases predefinidas
                onClick={() => setCurrentPage(index + 1)}
              >
                {index + 1}
              </PaginationItem>
            );
          })}
        </PaginationList>
        <PaginationNavigator onClick={() => setCurrentPage(Math.min(currentPage + 1, totalPages))}>
          Siguiente
          <CaretRight size={18} />
        </PaginationNavigator>
      </Pagination>
    </div>
  );
};

export default PaginationComponent;

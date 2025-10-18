import React from "react";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { getIcon } from "@/utils/getIcon";
import { FiList } from "react-icons/fi";
import type { QuickActionUiProps } from "@/types/overview.type";



const QuickActionUi: React.FC<QuickActionUiProps> = ({ actions }) => {
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {actions.slice(1).map((action, idx) => (
        <Card
          key={idx}
          className="cursor-pointer hover:scale-105 transition-transform"
          onClick={() => navigate(action.url)}
        >
          <CardContent className="flex flex-col items-center justify-center p-4">
            {action.icon && (
              <div className="text-3xl mb-2">
                {" "}
                {(() => {
                  const IconComponent = getIcon(action.icon);
                  return IconComponent ? <IconComponent /> : <FiList />;
                })()}
              </div> // use real icon component if you have
            )}
            <CardTitle className="text-center text-sm">
              {action.title}
            </CardTitle>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default QuickActionUi;

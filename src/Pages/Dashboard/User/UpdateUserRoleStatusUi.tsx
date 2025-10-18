import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Activity, Loader2, User, Shield, UserCheck, UserX } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface UpdateUserRoleStatusUiProps {
  type: "ROLE" | "STATUS";
  userId: string;
  setUserId: (val: string) => void;
  value: string;
  setValue: (val: string) => void;
  onSubmit: () => void;
  isLoading: boolean;
}

const UpdateUserRoleStatusUi: React.FC<UpdateUserRoleStatusUiProps> = ({
  type,
  userId,
  setUserId,
  value,
  setValue,
  onSubmit,
  isLoading,
}) => {
  const options = type === "ROLE" ? ["AGENT", "USER"] : ["ACTIVE", "BLOCKED"];
  
  // Get appropriate icon based on selection
  const getOptionIcon = (opt: string) => {
    if (type === "ROLE") {
      return opt === "AGENT" ? <Shield className="w-5 h-5 mr-2" /> : <User className="w-5 h-5 mr-2" />;
    } else {
      return opt === "ACTIVE" ? <UserCheck className="w-5 h-5 mr-2" /> : <UserX className="w-5 h-5 mr-2" />;
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto p-6">
      <Card className="w-full p-8 shadow-xl border-2 border-primary/10 dark:border-primary/20 hover:shadow-primary/10 transition-all duration-300 rounded-3xl bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
        <CardHeader className="px-2 pb-8">
          <div className="flex items-center justify-center mb-2">
            <div className="p-4 rounded-2xl bg-primary/10">
              {type === "ROLE" ? (
                <User className="w-12 h-12 text-primary" />
              ) : (
                <Activity className="w-12 h-12 text-primary" />
              )}
            </div>
          </div>
          <CardTitle className="text-3xl font-bold text-center text-gray-900 dark:text-gray-100">
            Update User {type}
          </CardTitle>
          <p className="text-lg text-center text-gray-600 dark:text-gray-400 mt-2">
            {type === "ROLE" 
              ? "Change user permissions and access levels" 
              : "Manage user account status and accessibility"}
          </p>
        </CardHeader>

        <CardContent className="px-2 space-y-10">
          <div className="grid gap-6">
            <div className="space-y-3">
              <Label
                htmlFor="userId"
                className="text-xl font-semibold text-gray-800 dark:text-gray-200"
              >
                User Identification
              </Label>
              <Input
                id="userId"
                type="text"
                placeholder="Enter User ID (e.g., 'usr_1a2b3c4d5e')"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                className="w-full px-6 py-4 text-lg border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 rounded-2xl focus:ring-3 focus:ring-primary focus:border-transparent transition-colors"
              />
              <p className="text-sm text-gray-500 dark:text-gray-400 ml-1">
                Find the User ID in your administration dashboard or user management section
              </p>
            </div>

            <div className="space-y-3">
              <Label
                htmlFor="valueSelect"
                className="text-xl font-semibold text-gray-800 dark:text-gray-200"
              >
                Select New {type}
              </Label>
              <Select value={value} onValueChange={setValue}>
                <SelectTrigger
                  id="valueSelect"
                  className="w-full px-6 py-4 text-lg border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 rounded-2xl"
                >
                  <SelectValue placeholder={`Choose a ${type.toLowerCase()}`} />
                </SelectTrigger>
                <SelectContent className="rounded-xl">
                  {options.map((opt) => (
                    <SelectItem 
                      key={opt} 
                      value={opt}
                      className="text-lg py-3 px-4 my-1 rounded-lg"
                    >
                      <div className="flex items-center">
                        {getOptionIcon(opt)}
                        <span>{opt}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {/* <p className="text-sm z-0 text-gray-500 dark:text-gray-400 ml-1">
                {type === "ROLE" 
                  ? "AGENT: Can manage content and assist users | USER: Standard account privileges" 
                  : "ACTIVE: Full account access | BLOCKED: No login or access permissions"}
              </p> */}
            </div>
          </div>

          <div className="pt-4">
            <Button
              onClick={onSubmit}
              disabled={!value || !userId || isLoading}
              className={`w-full flex items-center mt-20 justify-center gap-3 px-8 py-6 text-xl font-semibold rounded-2xl transition-all
              ${
                !value || !userId || isLoading
                  ? "bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed"
                  : "bg-primary hover:bg-primary/90 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all"
              }`}
              size="lg"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-6 h-6 animate-spin" />
                  Processing Update...
                </>
              ) : (
                <>
                  {type === "ROLE" ? <Shield className="w-6 h-6" /> : <Activity className="w-6 h-6" />}
                  Update User {type}
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UpdateUserRoleStatusUi;
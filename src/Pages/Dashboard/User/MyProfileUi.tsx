import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  CheckCircle,
  XCircle,
  Eye,
  EyeOff,
  Edit3,
  Save,
  X,
  Mail,
  Shield,
} from "lucide-react";
import type { MyProfileUiProps } from "@/types/MyProfileUiProps.type";

const MyProfileUi: React.FC<MyProfileUiProps> = ({
  myProfile,
  isEditing,
  isUpdating,
  showPassword,
  profileInfo,
  formFields,
  initial,
  name,
  email,
  role,
  is_verified,
  onEditClick,
  onSubmit,
  onChange,
  onTogglePasswordVisibility,
  onCancelEdit,
}) => {
  return (
    <div className="flex flex-col items-center min-h-screen md:p-8 bg-gradient-to-br from-background to-muted/20 text-foreground transition-all duration-300">
      <Card className="w-full max-w-4xl bg-card/90 backdrop-blur-sm shadow-2xl border border-border/40 rounded-3xl overflow-hidden">
        <CardHeader className="flex flex-col items-center gap-6 p-10 pb-8 border-b border-border/40 bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5">
          <div className="relative">
            <Avatar className="h-32 w-32 border-4 border-primary/20 shadow-xl transition-all duration-300 hover:scale-105 hover:border-primary/40">
              <AvatarImage src={myProfile.avatarUrl} alt={name} />
              <AvatarFallback className="bg-gradient-to-br from-primary to-primary/70 text-primary-foreground text-3xl font-semibold">
                {initial}
              </AvatarFallback>
            </Avatar>
            {is_verified && (
              <div className="absolute -bottom-2 -right-2 rounded-full bg-background p-1 shadow-md">
                <CheckCircle className="h-6 w-6 text-green-500 fill-green-100" />
              </div>
            )}
          </div>

          <div className="flex flex-col items-center space-y-3 text-center">
            <CardTitle className="text-4xl font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
              {name}
            </CardTitle>
            <div className="flex items-center gap-2 text-muted-foreground text-lg">
              <Mail className="h-5 w-5" />
              {email}
            </div>
            <Badge
              variant="secondary"
              className="mt-4 text-base py-2 px-4 rounded-full flex items-center gap-2"
            >
              <Shield className="h-4 w-4" />
              {role}
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="p-10 space-y-8">
          {isEditing ? (
            <form onSubmit={onSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {formFields.map((field) => (
                  <div key={field.name} className="relative">
                    <label
                      htmlFor={field.name}
                      className="block text-sm font-medium text-muted-foreground mb-2 ml-1"
                    >
                      {field.placeholder}
                    </label>
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.value}
                      onChange={onChange}
                      placeholder={field.placeholder}
                      type={field.type}
                      className="bg-input/40 text-foreground pr-12 py-6 rounded-xl border-border/40 focus-visible:ring-primary/50 text-base"
                    />
                    {field.hasEye && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-1 top-13 transform -translate-y-1/2 h-9 w-9 text-muted-foreground hover:text-foreground"
                        onClick={() =>
                          onTogglePasswordVisibility(
                            field.name as keyof typeof showPassword
                          )
                        }
                      >
                        {showPassword[
                          field.name as keyof typeof showPassword
                        ] ? (
                          <EyeOff className="h-5 w-5" />
                        ) : (
                          <Eye className="h-5 w-5" />
                        )}
                      </Button>
                    )}
                  </div>
                ))}
              </div>

              <div className="flex justify-end md:gap-4 pt-6">
                <Button
                  type="button"
                  variant="link"
                  onClick={onCancelEdit}
                  className="border-border/40 hover:bg-muted/50 text-foreground flex items-center gap-2 py-5 px-6 rounded-xl"
                >
                  <X className="h-5 w-5" />
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={isUpdating}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground flex items-center gap-2 py-5 px-7 rounded-xl text-base"
                >
                  {isUpdating ? (
                    <>
                      <div className="h-5 w-5 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
                      Saving Changes...
                    </>
                  ) : (
                    <>
                      <Save className="h-5 w-5" />
                      Save Changes
                    </>
                  )}
                </Button>
              </div>
            </form>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {profileInfo.map((info) => (
                  <div
                    key={info.label}
                    className={`p-5 bg-muted/20 rounded-2xl ${info.colSpan}`}
                  >
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                      {/* {info.icon &&
                        React.createElement(info.icon, {
                          className: "h-4 w-4",
                        })} */}
                      <span>{info.label}</span>
                    </div>
                    {info.badge ? (
                      <div className="flex items-center gap-2">
                        <Badge
                          className={`text-base py-1.5 px-3 rounded-full ${
                            is_verified
                              ? "bg-green-500/15 text-green-700 dark:text-green-300 border-green-500/30"
                              : "bg-red-500/15 text-red-700 dark:text-red-300 border-red-500/30"
                          }`}
                          variant="secondary"
                        >
                          {info.value}
                        </Badge>
                        {is_verified ? (
                          <CheckCircle className="h-5 w-5 text-green-500" />
                        ) : (
                          <XCircle className="h-5 w-5 text-red-500" />
                        )}
                      </div>
                    ) : (
                      <p className="text-foreground font-medium text-lg">
                        {info.value}
                      </p>
                    )}
                  </div>
                ))}
              </div>

              <Separator className="bg-border/40 my-4" />

              <div className="flex justify-end">
                <Button
                  onClick={onEditClick}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground flex items-center gap-2 py-5 px-7 rounded-xl text-base"
                >
                  <Edit3 className="h-5 w-5" />
                  Edit Profile Information
                </Button>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default MyProfileUi;

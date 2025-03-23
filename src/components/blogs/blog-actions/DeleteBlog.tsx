import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";

const DeleteBlog = ({ blogId }: { blogId: string }) => {
  const t = useTranslations("DeleteBlog");

  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Button size={"sm"} variant={"destructive"}>
          {t("delete")}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{t("prompt.title")}</AlertDialogTitle>
          <AlertDialogDescription>
            {t("prompt.description")}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{t("prompt.cancel")}</AlertDialogCancel>
          <AlertDialogAction className="bg-destructive text-white hover:bg-red-600">
            {t("delete")}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteBlog;

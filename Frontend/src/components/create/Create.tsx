import { Dialog, Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useLocation } from "react-router";
import { useState } from "react";

import PostForm from "../postForm/PostForm";
import TopicForm from "../topicForm/TopicForm";

function Create() {
  const { pathname } = useLocation();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return pathname === "/home" || pathname === "/topic" ? (
    <>
      <Fab
        sx={{
          position: "fixed",
          top: 80,
          left: 10,
        }}
        color="primary"
        onClick={() => setIsOpen(true)}
      >
        <AddIcon />
      </Fab>
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        fullWidth
        maxWidth="md"
      >
        {pathname === "/topic" ? (
          <PostForm setIsOpen={setIsOpen} />
        ) : pathname === "/home" ? (
          <TopicForm setIsOpen={setIsOpen} />
        ) : null}
      </Dialog>
    </>
  ) : null;
}

export default Create;

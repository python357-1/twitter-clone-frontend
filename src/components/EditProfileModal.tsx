import {
  Dialog,
  DialogPanel,
  DialogBackdrop,
  DialogTitle,
} from "@headlessui/react";
import React from "react";
import { toast } from "react-toastify";
import { Person } from "@/types";

export default function EditProfileModal({
  user,
  isOpen,
  setIsOpen,
}: {
  user: Person;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const handleSubmission = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fileInput: HTMLInputElement = document.querySelector("#profPic")!;
    const formData = new FormData();
    formData.append("profPic", fileInput.files![0]);
    //const _ = await fetch(
    //  `${process.env.NEXT_PUBLIC_BACKEND_URL}/users/me/profile-picture`,
    //  {
    //    method: "POST",
    //    body: formData,
    //  }
    //);
    // hello
  };

  const handleBioSave = async () => {
    const desc: string = (
      document.querySelector("#description")! as HTMLTextAreaElement
    ).value;
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/users/me/description`,
      {
        method: "POST",
        body: new URLSearchParams("description=" + desc),
      }
    );

    console.log(res);

    if (res.status != 200) {
      toast.error(await res.text());
    }
  };
  return (
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
      className="relative z-50 w-xl"
    >
      <DialogPanel>
        <DialogBackdrop className="fixed inset-0 bg-black/70" />
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
          <DialogPanel className="w-fit space-y-4 border rounded-xl bg-zinc-900 p-12">
            <DialogTitle className="font-bold text-2xl">
              Edit Profile
            </DialogTitle>
            <div className="relative">
              <form onSubmit={handleSubmission}>
                <label className="text-lg font-bold" htmlFor="profPic">
                  Profile Picture
                </label>
                <br />
                <input
                  className="mt-2"
                  type="file"
                  id="profPic"
                  name="profPic"
                />
                <button className="bg-blue-600 rounded-full px-2">
                  Submit
                </button>
              </form>

              <p className="text-lg font-bold mt-5">Profile Bio</p>
              <textarea
                className="text-white bg-slate-700 rounded-xl p-3 resize-none w-full mt-2"
                name="description"
                id="description"
                placeholder="You don't have a bio yet! Add one here."
                defaultValue={user.Description}
              ></textarea>
              <button
                className="bg-blue-600 rounded-full px-2 mt-1"
                onClick={handleBioSave}
              >
                Save
              </button>
            </div>
          </DialogPanel>
        </div>
      </DialogPanel>
    </Dialog>
  );
}

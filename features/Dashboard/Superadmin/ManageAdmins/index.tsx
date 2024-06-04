"use client";

import React from "react";

import {
  useCreateAdmin,
  useDeleteAdmin,
  useEditAdmin,
  useGetAdmins,
  useMutateUserDetails,
} from "@/useCases/UserUseCases";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { columns } from "./section/columns";
import { DataTable } from "./section/data-table";
import useManageAdminsFeature from "./hook";

const ManageAdminsFeature = () => {
  const {
    isDialogOpen,
    setIsDialogOpen,
    isEdit,
    setIsEdit,
    selectedData,
    setSelectedData,
    page,
    setPage,
    limit,
    setLimit,
    search,
    setSearch,
    value,
    form,
    handleAddData,
  } = useManageAdminsFeature();

  const { data, isLoading, refetch } = useGetAdmins(value, page, limit);

  const { mutate, isPending } = useCreateAdmin(setIsDialogOpen, refetch, form);

  const { mutate: userDetails } = useMutateUserDetails(
    form,
    setIsEdit,
    setSelectedData,
  );

  const { mutate: mutateEdit } = useEditAdmin(
    selectedData,
    setIsDialogOpen,
    refetch,
    form,
  );

  const { mutate: mutateDelete } = useDeleteAdmin(refetch);

  return (
    <div>
      <h1 className="text-4xl font-semibold">Manage Admin</h1>
      <div className="mt-10 flex items-center justify-between">
        <Input
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-sm"
        />
        <Dialog
          open={isDialogOpen}
          onOpenChange={(isOpen) => setIsDialogOpen(isOpen)}
        >
          <DialogTrigger asChild>
            <Button onClick={handleAddData}>Tambah Data</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-3xl">
            <DialogHeader>
              <DialogTitle>Admin</DialogTitle>
              <DialogDescription>
                {isEdit ? "Edit data admin" : "Tambah data admin baru"}
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit((values) =>
                  isEdit ? mutateEdit(values) : mutate(values),
                )}
                className="space-y-8"
              >
                <div className="grid gap-4">
                  <FormField
                    control={form.control}
                    name="fullname"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nama Lengkap</FormLabel>
                        <FormControl>
                          <Input placeholder="Max" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Username</FormLabel>
                        <FormControl>
                          <Input placeholder="maxbison99" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="m@example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          {isEdit ? "Masukan Password Baru" : "Password"}
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            placeholder={
                              isEdit ? "Masukan password baru" : "password"
                            }
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button type="submit" className="w-full" disabled={isPending}>
                    {isEdit ? "Ubah data" : "Tambah data"}
                  </Button>
                </div>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>
      <DataTable
        columns={columns}
        data={data?.data}
        isLoading={isLoading}
        limit={limit}
        setLimit={setLimit}
        page={page}
        setPage={setPage}
        totalPages={data?.totalPages}
        getUserById={userDetails}
        deleteData={mutateDelete}
        setIsEdit={setIsEdit}
        setIsDialogOpen={setIsDialogOpen}
      />
    </div>
  );
};

export default ManageAdminsFeature;

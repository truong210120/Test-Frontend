/* eslint-disable react/jsx-no-undef */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import {
  Button,
  FormLayout,
  TextField,
  Select,
  Icon,
  Text,
  Box,
  DataTable,
} from "@shopify/polaris";
import {
  ArrowLeftIcon,
  DeleteIcon,
  PlusCircleIcon,
  CheckCircleIcon,
} from "@shopify/polaris-icons";
import style from "./style.module.css";
// interface FormData {
//   campaign: string;
//   title: string;
//   desc: string;
//   rows: {
//     titleDiscount: string;
//     subtitle: string;
//     label: string;
//     quantity: number;
//     discountType: string;
//     amount?: number;
//   }[];
// }
function DynamicForm() {
  const {
    control,
    handleSubmit,
    getValues,
    watch,
    formState: { errors },
  } = useForm<any>();
  const [list, setList] = useState<any>([]);
  const { fields, append, remove } = useFieldArray({
    control,
    name: "rows",
  });
  function formatAmount(amount: string, discountType: string) {
    if (discountType === "discount") {
      return amount + "%";
    }
    if (discountType === "each") {
      return amount + "$";
    }
    if (discountType === "none") {
      return null;
    }
    return amount;
  }
  const values = getValues();
  const watchRows = watch("rows");
  const watchDesc = watch("desc");
  const watchTitle = watch("title");
  useEffect(() => {
    // Update 'list' state whenever 'watchRows' changes
    if (watchRows && watchRows?.length > 0) {
      const updatedList = watchRows?.map((item: any) => Object.values(item));
      setList(updatedList);
    }
  }, [watchRows, fields, watchDesc, watchTitle]);
  useEffect(() => {
    append([
      {
        titleDiscount: "",
        subtitle: "",
        label: "",
        quantity: 0,
        discountType: "none",
        amount: 0,
      },
    ]);
  }, []);

  const onSubmit = (data: any) => {
    if (data?.rows.length > 0) {
      const list = data?.rows?.map((item: any) => Object.values(item));
      setList(list);
      fetch("https://jsonplaceholder.typicode.com/posts?_limit=5")
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  };
  return (
    <div className="MainApp">
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormLayout>
          <Box>
            <div className={style.header}>
              <div className={style.back}>
                <Icon source={ArrowLeftIcon}></Icon>
              </div>
              <Text variant="heading3xl" as="h2">
                Create volume discount
              </Text>
            </div>
          </Box>
          <div className={style.Row}>
            <div>
              <div className={style.general}>
                <Text variant="heading3xl" as="h3">
                  General
                </Text>
                <Box>
                  <Controller
                    name="campaign"
                    rules={{ required: "Campaign is required" }}
                    defaultValue="Volume discount #2"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        label="Campaign"
                        error={!!errors.campaign}
                        placeholder="Enter Campaign Name"
                        autoComplete=""
                        {...field}
                      />
                    )}
                  />
                  {errors.campaign && (
                    <p style={{ color: "red" }}>Campaign không được bỏ trống</p>
                  )}
                </Box>
                <Box>
                  <Controller
                    name="title"
                    control={control}
                    defaultValue="Buy more and save"
                    render={({ field }) => (
                      <TextField
                        label="Title"
                        placeholder="Enter Title Campaign"
                        autoComplete=""
                        {...field}
                      />
                    )}
                  />
                </Box>
                <Box>
                  <Controller
                    name="desc"
                    defaultValue="Apply for all products in store"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        label="Description"
                        placeholder="Enter Description Campaign"
                        autoComplete=""
                        {...field}
                      />
                    )}
                  />
                </Box>
              </div>
              <div className={style.discount}>
                <div className={style.header3}>
                  <Text variant="heading3xl" as="h3">
                    Volume discount rule
                  </Text>
                </div>
                {fields.map((item: any, index) => (
                  <div className={style.Item} key={item.id}>
                    <div className={style.option}>
                      <p>OPTION {index + 1}</p>
                    </div>
                    <div className={style.ItemDiscount}>
                      <div className={style.delete}>
                        <Button
                          icon={DeleteIcon}
                          onClick={() => remove(index)}
                        ></Button>
                      </div>
                      <div>
                        <div className={style.flex}>
                          <Controller
                            name={`rows[${index}].titleDiscount`}
                            control={control}
                            rules={{
                              required: "Title is required",
                            }}
                            render={({ field, fieldState }) => (
                              <div>
                                <TextField
                                  label="Title"
                                  placeholder="Title Discount"
                                  autoComplete=""
                                  {...field}
                                />
                                {fieldState.error && (
                                  <p
                                    style={{ color: "red", paddingTop: "2px" }}
                                  >
                                    {fieldState.error.message}
                                  </p>
                                )}
                              </div>
                            )}
                          />
                          <Controller
                            name={`rows[${index}].subtitle`}
                            control={control}
                            render={({ field }) => (
                              <TextField
                                label="Subtitle"
                                placeholder="Enter Subtitle"
                                autoComplete=""
                                {...field}
                              />
                            )}
                          />
                          <Controller
                            name={`rows[${index}].label`}
                            control={control}
                            render={({ field }) => (
                              <TextField
                                label="Label (option)"
                                placeholder="Enter Label"
                                autoComplete=""
                                {...field}
                              />
                            )}
                          />
                          <Box>
                            <Controller
                              name={`rows[${index}].quantity`}
                              control={control}
                              rules={{
                                required: "Quantity is required",
                                pattern: {
                                  value: /^[1-9]\d*$/, // Pattern to accept positive integers
                                  message: "Please enter a valid quantity",
                                },
                              }}
                              render={({ field, fieldState }) => (
                                <div>
                                  <TextField
                                    label="Quantity"
                                    type="number"
                                    error={!!values[index]?.quantity}
                                    placeholder="Enter Quantity"
                                    autoComplete=""
                                    {...field}
                                  />
                                  {fieldState.error && (
                                    <p
                                      style={{
                                        color: "red",
                                        paddingTop: "2px",
                                      }}
                                    >
                                      {fieldState.error.message}
                                    </p>
                                  )}
                                </div>
                              )}
                            />
                          </Box>
                          <Controller
                            name={`rows[${index}].discountType`}
                            control={control}
                            render={({ field }) => (
                              <Select
                                requiredIndicator={false}
                                label="Discoount Type"
                                options={[
                                  { label: "None", value: "none" },
                                  { label: "% discount", value: "discount" },
                                  { label: "Discount / each", value: "each" },
                                ]}
                                {...field}
                              />
                            )}
                          />
                          {watch(`rows[${index}].discountType`) !== "none" ? (
                            <Controller
                              name={`rows[${index}].amount`}
                              control={control}
                              rules={{
                                required: "Amount is required",
                                pattern: {
                                  value: /^\d+(\.\d{1,2})?$/,
                                  message: "Please enter a valid amount",
                                },
                              }}
                              render={({ field, fieldState }) => (
                                <div>
                                  <TextField
                                    label="Amount"
                                    type="number"
                                    placeholder="Enter Amount"
                                    autoComplete=""
                                    suffix={
                                      watch(`rows[${index}].discountType`) ===
                                      "discount"
                                        ? "%"
                                        : "$"
                                    }
                                    {...field}
                                  />
                                  {fieldState.error && (
                                    <p style={{ color: "red", paddingTop: '2px' }}>
                                      {fieldState.error.message}
                                    </p>
                                  )}
                                </div>
                              )}
                            />
                          ) : (
                            ""
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className={style.footer}>
                <div className={style.btn1}>
                  <Button icon={PlusCircleIcon} onClick={() => append({})}>
                    Add Option
                  </Button>
                </div>
                <div className={style.btn2}>
                  <Button submit icon={CheckCircleIcon}>
                    Submit
                  </Button>
                </div>
              </div>
            </div>
            <div className={style.tableDiscount}>
              <div>
                <Text variant="heading3xl" as="h3">
                  Preview
                </Text>
              </div>
              <div className={style.titleTable}>
                <Text variant="heading3xl" as="h3">
                  {values.title}
                </Text>
              </div>
              <div>
                <Text variant="heading3xl" as="h4">
                  {values.desc}
                </Text>
              </div>
              <div className={style.tableDetail}>
                <DataTable
                  columnContentTypes={[
                    "text",
                    "text",
                    "text",
                    "text",
                    "numeric",
                    "numeric",
                  ]}
                  headings={[
                    "Title",
                    "Sub Title",
                    "Label",
                    "Quantity",
                    "Discount Type",
                    "Amount",
                  ]}
                  initialSortColumnIndex={4}
                  hasZebraStripingOnData
                  increasedTableDensity
                  rows={list.map((row: any[]) => [
                    row[0],
                    row[1],
                    row[2],
                    row[3],
                    row[4],
                    formatAmount(row[5], row[4]),
                  ])}
                />
              </div>
            </div>
          </div>
        </FormLayout>
      </form>
    </div>
  );
}

export default DynamicForm;

/* eslint-disable react/jsx-no-undef */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import {
  Button,
  FormLayout,
  TextField,
  Select,
  Icon,
  Text,
  Box,
} from "@shopify/polaris";
import { ArrowLeftIcon, DeleteIcon } from "@shopify/polaris-icons";
import style from "./style.module.css";
function DynamicForm() {
  const { control, handleSubmit } = useForm();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "rows",
  });

  useEffect(() => {
    append([
      {
        titleDiscount: "",
        subtitle: "",
        label: "",
        quantity: 0,
        discountType: "none",
        amout: 0,
      },
    ]);
  }, []);

  const onSubmit = (data: any) => {
    console.log(data);
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
          <div className={style.general}>
            <Text variant="heading3xl" as="h3">
              General
            </Text>
            <div>
              <Controller
                name="campaign"
                control={control}
                render={({ field }) => (
                  <TextField
                    label="Campaign"
                    placeholder="Enter Campaign Name"
                    autoComplete=""
                    {...field}
                  />
                )}
              />
            </div>
            <div>
              <Controller
                name="title"
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
            </div>
            <div>
              <Controller
                name="desc"
                control={control}
                render={({ field }) => (
                  <TextField
                    label="Title"
                    placeholder="Enter Title Campaign"
                    autoComplete=""
                    {...field}
                  />
                )}
              />
            </div>
          </div>
          <div className={style.discount}>
            <div className={style.header3}>
              <Text variant="heading3xl" as="h3">
                Volume discount rule
              </Text>
            </div>
            {fields.map((item, index) => (
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
                        render={({ field }) => (
                          <TextField
                            label="Title"
                            placeholder="Title Discount"
                            autoComplete=""
                            {...field}
                          />
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
                            label="Label"
                            placeholder="Enter Label"
                            autoComplete=""
                            {...field}
                          />
                        )}
                      />
                      <Controller
                        name={`rows[${index}].quantity`}
                        control={control}
                        render={({ field }) => (
                          <TextField
                            label="Quantity"
                            type="number"
                            placeholder="Enter Quantity"
                            autoComplete=""
                            {...field}
                          />
                        )}
                      />
                      <Controller
                        name={`rows[${index}].dicountType`}
                        control={control}
                        render={({ field }) => (
                          <Select
                            requiredIndicator={false}
                            label="Select Option"
                            options={[
                              { label: "Option 1", value: "option1" },
                              { label: "Option 2", value: "option2" },
                              { label: "Option 3", value: "option3" },
                            ]}
                            {...field}
                          />
                        )}
                      />
                      <Controller
                        name={`rows[${index}].amount`}
                        control={control}
                        render={({ field }) => (
                          <TextField
                            label="Amount"
                            type="number"
                            placeholder="Enter Amount"
                            autoComplete=""
                            {...field}
                          />
                        )}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <Button onClick={() => append({})}>Add Row</Button>
          <Button submit>Submit</Button>
        </FormLayout>
      </form>
    </div>
  );
}

export default DynamicForm;

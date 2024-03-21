import { Button, Select, Text, TextField } from "@shopify/polaris";
import React from "react";
import { DeleteIcon } from "@shopify/polaris-icons";
import { Controller } from "react-hook-form";
interface IDiscount {
    discountTitle: string
    subTitle: string
    dicountType: string
    label: string;
    quantity: string
    amount: number
  }
interface ICustomDiscount {
  control: any;
  dataDiscount: IDiscount
  remove : () => void
}
const CustomDiscount = ({ control, remove, dataDiscount }: ICustomDiscount) => {
    console.log(dataDiscount);
  return (
    <div>
      <div>
        <Text variant="headingXl" as="h3">
          Option 1
        </Text>
        <Button onClick={remove} icon={DeleteIcon} />
      </div>
      <div style={{ display: "flex", gap: "40px", flexWrap: "wrap" }}>
        <Controller
          name="discountTitle"
          control={control}
          defaultValue="Buy more and save"
          rules={{ required: "discountTitle is required" }}
          render={({ field }) => (
            <>
              <TextField {...field} label="Title" autoComplete="off" />
            </>
          )}
        />
        <Controller
          name="subTitle"
          control={control}
          defaultValue="Buy more and save"
          rules={{ required: "Subtitle is required" }}
          render={({ field }) => (
            <>
              <TextField {...field} label="SubTitle" autoComplete="off" />
            </>
          )}
        />
        <Controller
          name="label"
          control={control}
          defaultValue="Buy more and save"
          rules={{ required: "Title is required" }}
          render={({ field }) => (
            <>
              <TextField
                {...field}
                label="Label (optional)"
                autoComplete="off"
              />
            </>
          )}
        />
        <Controller
          name="quantity"
          control={control}
          defaultValue="Buy more and save"
          rules={{ required: "Quantity is required" }}
          render={({ field }) => (
            <>
              <TextField {...field} label="Quantity" autoComplete="off" />
            </>
          )}
        />
        <Controller
          name="dicountType"
          control={control}
          defaultValue=""
          rules={{ required: "Please select an option" }}
          render={({ field }) => (
            <>
              <Select
                {...field}
                label="Dicount type"
                options={[
                  { label: "None", value: "none" },
                  { label: "% discount", value: "percentDiscount" },
                  { label: "Discount / each", value: "each" },
                ]}
              />
            </>
          )}
        />
        <Controller
          name="amount"
          control={control}
          defaultValue="Buy more and save"
          rules={{ required: "Amount is required" }}
          render={({ field }) => (
            <>
              <TextField {...field} label="Amount" autoComplete="off" />
            </>
          )}
        />
      </div>
    </div>
  );
};

export default CustomDiscount;

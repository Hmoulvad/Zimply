import { css } from "hono/css";
import Button from "ui/Button/Button";
import Calender from "ui/Form/Calender";
import Checkbox from "ui/Form/Checkbox";
import Input from "ui/Form/Input";
import RadioGroup from "ui/Form/RadioGroup";
import Select from "ui/Form/Select";
import TextArea from "ui/Form/TextArea";

export default function FormPage() {
  return (
    <form className={formStyle}>
      <Input
        placeholder="Search for product..."
        label="Product Search"
        name="search"
      />
      <TextArea
        label="Description"
        name="Description"
        placeholder="Insert your description here..."
      />
      <Checkbox label="Show only available products" name="available" />
      <Select
        name="Car choice"
        label="Select a car"
        options={["Volvo", "Saab", "Mercedes", "Audi"]}
      />
      <Calender label="Select a date" name="DeliveryDate" />
      <RadioGroup
        name="Favorite Weblanguage"
        label="Please select your favorite Web language"
        options={[
          { value: "html", label: "HTML" },
          { value: "css", label: "CSS" },
          { value: "js", label: "JavaScript" },
          { value: "ts", label: "TypeScript", defaultChecked: true },
        ]}
      />
      <Button type="submit">Submit</Button>
    </form>
  );
}

const formStyle = css`
  display: grid;
  gap: var(--size-2);
`;

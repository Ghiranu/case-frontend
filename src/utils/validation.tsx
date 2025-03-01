import { z as schemaDeclarator } from "zod";
import {
  MINIMUM_CHARACTERS,
  POST_BODY_VALIDATION_MESSAGE,
  POST_TITLE_VALIDATION_MESSAGE,
} from "./constants";

const schema = schemaDeclarator.object({
  title: schemaDeclarator
    .string()
    .min(MINIMUM_CHARACTERS, POST_TITLE_VALIDATION_MESSAGE),
  body: schemaDeclarator
    .string()
    .min(MINIMUM_CHARACTERS, POST_BODY_VALIDATION_MESSAGE),
  userId: schemaDeclarator.number().optional(),
  id: schemaDeclarator.number().optional(),
});

type PostDataSchema = schemaDeclarator.infer<typeof schema>;

export { schema };

export type { PostDataSchema };

import { countQueue } from "./configs/count-queue";
import {updateCount} from './services/update-count'

countQueue.process(async ({ data }) => {
  const { count } = data;
  console.log({ data });
  await updateCount(count);
});

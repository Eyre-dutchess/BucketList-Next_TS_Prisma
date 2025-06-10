
import { getCurrentUser } from "./action/getCurrentUser";
import { getTasks } from "./action/getTasks";
import { HeadSec } from "./component/HeadSec";
import { ListSec } from "./component/ListSec";

export default async function Home() {
  const tasks = await getTasks()
  const curUser = await getCurrentUser()
  return (
    <div className="w-full relative pt-[50vh]">
      <HeadSec curUser= {curUser}/>
      <ListSec tasks ={tasks}/>
    </div>
  );
}

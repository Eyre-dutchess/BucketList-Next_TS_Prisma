import { getCurrentTask } from "@/app/action/getCurrentTask";
import { getCurrentUser } from "@/app/action/getCurrentUser";
import { getTasks } from "@/app/action/getTasks";
import { HeadSec } from "@/app/component/HeadSec";
import { ListSec } from "@/app/component/ListSec";
import { EditTaskModal } from "@/app/component/modal/EditTaskModal";


interface IParams{
    taskId: string
}
export default async function Home({params}:{params:IParams}) {
  const tasks = await getTasks()
  const curUser = await getCurrentUser()
  const curTask = await getCurrentTask(params)
  return (
    <div className="w-full relative pt-[50vh] z-0">
      <HeadSec curUser= {curUser}/>
      <ListSec tasks ={tasks}/>
      <EditTaskModal curTask={curTask}/>
    </div>
  );
}

import { useProfileQuery } from "@/api/profiles/hooks/use-profile-query"
import { useParams } from "react-router"

export const Profile: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const { data: profile } = useProfileQuery(id)
  console.log({ profile })

  return (
    <div className="">
      
    </div>
  )
}

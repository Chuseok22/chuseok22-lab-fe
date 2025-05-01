import { create } from "zustand/react";
import { MemberResponse } from "@/lib/api/home/member.type";

interface MemberState {
  member: MemberResponse | null;
  setMember: (member: MemberResponse) => void;
}

const useMemberInfo = create<MemberState>((setState) => ({
  member: null,
  setMember: (member) => setState({member: member})
}))

export default useMemberInfo;
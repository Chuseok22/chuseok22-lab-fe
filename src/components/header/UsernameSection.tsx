import Link from "next/link";
import Image from "next/image";

interface UsernameSectionProps {
  username: string | null;
}

const UsernameSection = ({ username }: UsernameSectionProps) => {
  if (username) {
    return (
        <div className="flex items-center">
          <Image src="/profile-icon.svg" alt="profile" width={30} height={30} />
          <p className="text-sm px-2 font-bold">{username}</p>
        </div>
    );
  }

  return (
      <Link href="/auth/login" className="flex items-center">
        <Image src="/profile-icon.svg" alt="profile" width={30} height={30} />
        <p className="text-sm px-2 font-bold">Login</p>
      </Link>
  );
}

export default UsernameSection;
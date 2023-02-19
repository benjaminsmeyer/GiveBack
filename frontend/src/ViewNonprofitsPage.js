import { Center, Stack } from "@chakra-ui/react";
import { useEffect, useState } from "react";

import Navbar from "./navbar";
import Footer from "./footer";
import Nonprofit from "./Nonprofit";
import { getNonprofits } from "./api";
import { Input } from "@chakra-ui/react";

export default function ViewNonprofitsPage() {
  const [nonprofits, setNonprofits] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  useEffect(() => {
    getNonprofits().then((data) => setNonprofits(data.nonprofits));
  }, []);
  return (
    <Stack>
      <Navbar />
      <Center>
        <Input placeholder="🔍 Search for nonprofit organizations" tmlSize={4} width='1000px' borderRadius="16px" onChange={(e) => setSearchTerm(e.target.value)} />
     </Center>
      <Center paddingY={"2em"} backgroundColor={"#F7F7FA"}>
        <Stack
          dir={"column"}
          maxW={"3xl"}
          width={"100%"}
          marginX={"auto"}
          gap={"2em"}
        >
          {searchTerm.length === 0
            ? nonprofits.map((nonprofit) => {
                return <Nonprofit info={nonprofit} key={nonprofit.uuid} />;
              })
            : nonprofits
                .filter((nonprofit) => {
                  return (
                    nonprofit.name.toLowerCase().includes(searchTerm) ||
                    nonprofit.description.toLowerCase().includes(searchTerm) ||
                    nonprofit.tags
                      .map((n) => n.toLowerCase())
                      .some((n) => n.includes(searchTerm))
                  );
                })
                .map((nonprofit) => {
                  return <Nonprofit info={nonprofit} key={nonprofit.uuid} />;
                })}
        </Stack>
      </Center>
      <Footer />
    </Stack>
  );
}

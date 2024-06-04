import HomebaseRUanganDetailFeature from "@/features/Homebase/RuanganDetail";
import React from "react";

const HomebaseRuanganDetail = ({ params }: { params: { slug: string } }) => {
  return <HomebaseRUanganDetailFeature params={params} />;
};

export default HomebaseRuanganDetail;

"use client";

import React, { useState, useEffect } from "react";
import { useOrganization, useUser } from "@clerk/nextjs";
import InterviewCard from "@/components/dashboard/interview/interviewCard";
import CreateInterviewCard from "@/components/dashboard/interview/createInterviewCard";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { InterviewService } from "@/services/interviews.service";
import { ClientService } from "@/services/clients.service";
import { ResponseService } from "@/services/responses.service";
import { useInterviews } from "@/contexts/interviews.context";
import Modal from "@/components/dashboard/Modal";
import { Gem, Plus, Users, Building, UserPlus } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

function Interviews() {
  const { interviews, interviewsLoading } = useInterviews();
  const { organization, isLoaded: isOrgLoaded } = useOrganization();
  const { user } = useUser();
  const [loading, setLoading] = useState<boolean>(false);
  const [currentPlan, setCurrentPlan] = useState<string>("");
  const [allowedResponsesCount, setAllowedResponsesCount] =
    useState<number>(10);
  const [isUpgradeModalOpen, setIsUpgradeModalOpen] = useState<boolean>(false);
  const [isOrgModalOpen, setIsOrgModalOpen] = useState<boolean>(false);

  function InterviewsLoader() {
    return (
      <>
        <div className="flex flex-row">
          <div className="h-60 w-56 ml-1 mr-3 mt-3 flex-none animate-pulse rounded-xl bg-gray-300" />
          <div className="h-60 w-56 ml-1 mr-3  mt-3 flex-none animate-pulse rounded-xl bg-gray-300" />
          <div className="h-60 w-56 ml-1 mr-3 mt-3 flex-none animate-pulse rounded-xl bg-gray-300" />
        </div>
      </>
    );
  }

  useEffect(() => {
    // Check if user has an organization when the component mounts
    if (isOrgLoaded && user && !organization) {
      setIsOrgModalOpen(true);
    }
  }, [isOrgLoaded, organization, user]);

  useEffect(() => {
    const fetchOrganizationData = async () => {
      try {
        if (organization?.id) {
          const data = await ClientService.getOrganizationById(organization.id);
          if (data?.plan) {
            setCurrentPlan(data.plan);
            if (data.plan === "free_trial_over") {
              setIsUpgradeModalOpen(true);
            }
          }
          if (data?.allowed_responses_count) {
            setAllowedResponsesCount(data.allowed_responses_count);
          }
        }
      } catch (error) {
        console.error("Error fetching organization data:", error);
      }
    };

    fetchOrganizationData();
  }, [organization]);

  useEffect(() => {
    const fetchResponsesCount = async () => {
      if (!organization || currentPlan !== "free") {
        return;
      }

      setLoading(true);
      try {
        const totalResponses =
          await ResponseService.getResponseCountByOrganizationId(
            organization.id
          );
        const hasExceededLimit = totalResponses >= allowedResponsesCount;
        if (hasExceededLimit) {
          setCurrentPlan("free_trial_over");
          await InterviewService.deactivateInterviewsByOrgId(organization.id);
          await ClientService.updateOrganization(
            { plan: "free_trial_over" },
            organization.id
          );
        }
      } catch (error) {
        console.error("Error fetching responses:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchResponsesCount();
  }, [organization, currentPlan, allowedResponsesCount]);

  return (
    <main className="p-8 pt-0 ml-12 mr-auto rounded-md">
      <div className="flex flex-col items-left">
        <h2 className="mr-2 text-2xl font-semibold tracking-tight mt-8">
          My Interviews
        </h2>
        <h3 className=" text-sm tracking-tight text-gray-600 font-medium ">
          Start getting responses now!
        </h3>
        <div className="relative flex items-center mt-1 flex-wrap">
          {currentPlan == "free_trial_over" ? (
            <Card className=" flex bg-gray-200 items-center border-dashed border-gray-700 border-2 hover:scale-105 ease-in-out duration-300 h-60 w-56 ml-1 mr-3 mt-4 rounded-xl shrink-0 overflow-hidden shadow-md">
              <CardContent className="flex items-center flex-col mx-auto">
                <div className="flex flex-col justify-center items-center w-full overflow-hidden">
                  <Plus size={90} strokeWidth={0.5} className="text-gray-700" />
                </div>
                <CardTitle className="p-0 text-md text-center">
                  You cannot create any more interviews unless you upgrade
                </CardTitle>
              </CardContent>
            </Card>
          ) : (
            <CreateInterviewCard />
          )}
          {interviewsLoading || loading ? (
            <InterviewsLoader />
          ) : (
            <>
              {isUpgradeModalOpen && (
                <Modal
                  open={isUpgradeModalOpen}
                  onClose={() => setIsUpgradeModalOpen(false)}
                >
                  <div className="flex flex-col space-y-4">
                    <div className="flex justify-center text-indigo-600">
                      <Gem />
                    </div>
                    <h3 className="text-xl font-semibold text-center">
                      Upgrade to Pro
                    </h3>
                    <p className="text-l text-center">
                      You have reached your limit for the free trial. Please
                      upgrade to pro to continue using our features.
                    </p>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="flex justify-center items-center">
                        <Image
                          src={"/premium-plan-icon.png"}
                          alt="Graphic"
                          width={299}
                          height={300}
                        />
                      </div>

                      <div className="grid grid-rows-2 gap-2">
                        <div className="p-4 border rounded-lg">
                          <h4 className="text-lg font-medium">Free Plan</h4>
                          <ul className="list-disc pl-5 mt-2">
                            <li>10 Responses</li>
                            <li>Basic Support</li>
                            <li>Limited Features</li>
                          </ul>
                        </div>
                        <div className="p-4 border rounded-lg">
                          <h4 className="text-lg font-medium">Pro Plan</h4>
                          <ul className="list-disc pl-5 mt-2">
                            <li>Flexible Pay-Per-Response</li>
                            <li>Priority Support</li>
                            <li>All Features</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <p className="text-l text-center">
                      Contact{" "}
                      <span className="font-semibold">
                        anurag.jha.in@gmail.com
                      </span>{" "}
                      to upgrade your plan.
                    </p>
                  </div>
                </Modal>
              )}

              {isOrgModalOpen && (
                <Modal
                  open={isOrgModalOpen}
                  onClose={() => setIsOrgModalOpen(false)}
                >
                  <div className="flex flex-col space-y-4">
                    <div className="flex justify-center text-indigo-600">
                      <Users size={32} />
                    </div>
                    <h3 className="text-xl font-semibold text-center">
                      No Organization Selected
                    </h3>
                    <p className="text-center">
                      You are currently using CognitoAI without an organization.
                      While all features will work, creating an organization
                      would allow you to share interviews, questions, and
                      assessments with your team.
                    </p>
                    <p className="text-sm text-center text-gray-500 mt-2">
                      You can create or join an organization anytime from your
                      user profile.
                    </p>
                    <div className="flex justify-center mt-4">
                      <Button onClick={() => setIsOrgModalOpen(false)}>
                        Got it
                      </Button>
                    </div>
                  </div>
                </Modal>
              )}

              {interviews.map((item) => (
                <InterviewCard
                  id={item.id}
                  interviewerId={item.interviewer_id}
                  key={item.id}
                  name={item.name}
                  url={item.url ?? ""}
                  readableSlug={item.readable_slug}
                />
              ))}
            </>
          )}
        </div>
      </div>
    </main>
  );
}

export default Interviews;

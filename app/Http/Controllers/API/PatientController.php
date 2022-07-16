<?php

namespace App\Http\Controllers\API;

use App\Events\AddPatientEvent;
use App\Events\RemovePatientEvent;
use App\Http\Requests\PatientRequest;
use App\Repositories\PatientRepository;
use Illuminate\Http\JsonResponse;
use Illuminate\Routing\Controller as BaseController;

class PatientController extends BaseController
{
    private PatientRepository $patientRepository;
    public function __construct(PatientRepository $patientRepository)
    {
        $this->patientRepository = $patientRepository;
    }

    public function add(PatientRequest $request): JsonResponse
    {
        $params = $request->validated();

        try {
            $patient = $this->patientRepository->insertOrUpdate($params);
            broadcast(new AddPatientEvent($patient->toArray()))->toOthers();
        } catch (\Exception $exception) {
            return response()->json(['message' => $exception->getMessage()], 400);
        }

        return response()->json(['data' => $patient->toArray()], 201);
    }

    public function remove($id): JsonResponse
    {
        try {
            $bRemoved = $this->patientRepository->removePatient($id);
            if (!$bRemoved) {
                return response()->json(['message' => 'The patient was not existed.'], 400);
            }
            broadcast(new RemovePatientEvent($id))->toOthers();
            return response()->json([], 200);
        } catch (\Exception $exception) {
            return response()->json(['message' => $exception->getMessage()], 400);
        }
    }

    public function list(): JsonResponse
    {
        try {
            $patients = $this->patientRepository->listPatients();
            return response()->json($patients->toArray(), 200);
        } catch (\Exception $exception) {
            return response()->json(['message' => $exception->getMessage()], 400);
        }
    }
}

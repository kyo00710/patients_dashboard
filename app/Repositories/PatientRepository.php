<?php

namespace App\Repositories;

use App\Models\Patients;

class PatientRepository
{
    /**
     * @throws \Exception
     */
    public function insertOrUpdate($params)
    {
        $patient = app(Patients::class)->where('vsee_id', $params['vsee_id'])->first();
        if (isset($patient) && !$patient->status) {
            throw new \Exception('This patient was in queue.');
        }
        return app(Patients::class)->updateOrCreate([
            'vsee_id' => $params['vsee_id']
        ], [
            'name' => $params['name'],
            'email' => $params['email'] ?? null,
            'reason' => $params['reason'] ?? null,
            'vsee_id' => $params['vsee_id'],
            'status' => 0
        ]);
    }

    public function removePatient($id): bool
    {
        $patient = app(Patients::class)->where('vsee_id', $id)->first();
        if (!isset($patient)) {
            return false;
        }
        $patient->update(['status' => 1]);
        return true;
    }

    public function listPatients()
    {
        return app(Patients::class)->where('status', 0)->orderBy('id', 'DESC')->get();
    }
}

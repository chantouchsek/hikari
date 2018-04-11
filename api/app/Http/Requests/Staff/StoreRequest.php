<?php

namespace App\Http\Requests\Staff;

use App\Http\Requests\BaseRequest as Request;
use Illuminate\Validation\Rule;

class StoreRequest extends Request
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
          'staff_id' => 'required|unique:users',
          'name' => 'required|min:3',
          'store_id' => [
            'required',
            Rule::exists('stores', 'id'),
          ],
        ];
    }
}

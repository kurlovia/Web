Schema::table('users', function (Blueprint $table) {
    $table->string('phone')->nullable()->unique();
    $table->boolean('phone_verified')->default(false);
    $table->string('phone_verification_code')->nullable();
    $table->timestamp('phone_verification_expires_at')->nullable();
});
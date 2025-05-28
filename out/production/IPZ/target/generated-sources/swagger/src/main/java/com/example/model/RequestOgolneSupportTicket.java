package com.example.model;

import java.util.Objects;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonCreator;
import io.swagger.v3.oas.annotations.media.Schema;
import org.springframework.validation.annotation.Validated;
import javax.validation.Valid;
import javax.validation.constraints.*;

/**
 * RequestOgolneSupportTicket
 */
@Validated
@javax.annotation.Generated(value = "io.swagger.codegen.v3.generators.java.SpringCodegen", date = "2025-04-01T20:32:28.347647700+02:00[Europe/Warsaw]")


public class RequestOgolneSupportTicket   {
  @JsonProperty("imie_i_nazwisko")
  private String imieINazwisko = null;

  @JsonProperty("email")
  private String email = null;

  @JsonProperty("temat")
  private String temat = null;

  @JsonProperty("wiadomosc")
  private String wiadomosc = null;

  public RequestOgolneSupportTicket imieINazwisko(String imieINazwisko) {
    this.imieINazwisko = imieINazwisko;
    return this;
  }

  /**
   * Get imieINazwisko
   * @return imieINazwisko
   **/
  @Schema(example = "Jan Kowalski", required = true, description = "")
      @NotNull

    public String getImieINazwisko() {
    return imieINazwisko;
  }

  public void setImieINazwisko(String imieINazwisko) {
    this.imieINazwisko = imieINazwisko;
  }

  public RequestOgolneSupportTicket email(String email) {
    this.email = email;
    return this;
  }

  /**
   * Get email
   * @return email
   **/
  @Schema(example = "jan.kowalski@example.com", required = true, description = "")
      @NotNull

    public String getEmail() {
    return email;
  }

  public void setEmail(String email) {
    this.email = email;
  }

  public RequestOgolneSupportTicket temat(String temat) {
    this.temat = temat;
    return this;
  }

  /**
   * Get temat
   * @return temat
   **/
  @Schema(example = "Problem z rezerwacją", required = true, description = "")
      @NotNull

    public String getTemat() {
    return temat;
  }

  public void setTemat(String temat) {
    this.temat = temat;
  }

  public RequestOgolneSupportTicket wiadomosc(String wiadomosc) {
    this.wiadomosc = wiadomosc;
    return this;
  }

  /**
   * Get wiadomosc
   * @return wiadomosc
   **/
  @Schema(example = "Nie mogę zalogować się do swojego konta.", required = true, description = "")
      @NotNull

    public String getWiadomosc() {
    return wiadomosc;
  }

  public void setWiadomosc(String wiadomosc) {
    this.wiadomosc = wiadomosc;
  }


  @Override
  public boolean equals(java.lang.Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    RequestOgolneSupportTicket requestOgolneSupportTicket = (RequestOgolneSupportTicket) o;
    return Objects.equals(this.imieINazwisko, requestOgolneSupportTicket.imieINazwisko) &&
        Objects.equals(this.email, requestOgolneSupportTicket.email) &&
        Objects.equals(this.temat, requestOgolneSupportTicket.temat) &&
        Objects.equals(this.wiadomosc, requestOgolneSupportTicket.wiadomosc);
  }

  @Override
  public int hashCode() {
    return Objects.hash(imieINazwisko, email, temat, wiadomosc);
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class RequestOgolneSupportTicket {\n");
    
    sb.append("    imieINazwisko: ").append(toIndentedString(imieINazwisko)).append("\n");
    sb.append("    email: ").append(toIndentedString(email)).append("\n");
    sb.append("    temat: ").append(toIndentedString(temat)).append("\n");
    sb.append("    wiadomosc: ").append(toIndentedString(wiadomosc)).append("\n");
    sb.append("}");
    return sb.toString();
  }

  /**
   * Convert the given object to string with each line indented by 4 spaces
   * (except the first line).
   */
  private String toIndentedString(java.lang.Object o) {
    if (o == null) {
      return "null";
    }
    return o.toString().replace("\n", "\n    ");
  }
}
